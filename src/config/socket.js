const socket = require("socket.io");

const { getSecretRoomId } = require("../helpers/common_functions");
const Chats = require("../models/chat.schema");
const Connections = require("../models/connection.schema");

const validateChatRoom = async (userId, targetUserId) => {
	const isConnectionExists = await Connections.findOne({
		$or: [
			{
				fromUserId: userId,
				toUserId: targetUserId,
				status: "accepted",
			},
			{
				fromUserId: targetUserId,
				toUserId: userId,
				status: "accepted",
			},
		],
	});

	if (!isConnectionExists) {
		throw new Error("No connection exists with target user");
	}
};

const initializeSocket = (httpServer) => {
	const io = socket(httpServer, {
		cors: {
			origin: process.env.FRONTEND_URL,
		},
	});

	io.on("connection", (socket) => {
		socket.on("joinChat", async (reqProps) => {
			const { userId, targetUserId } = reqProps;

			await validateChatRoom(userId, targetUserId);
			const roomId = getSecretRoomId(userId, targetUserId);
			socket.join(roomId);
		});

		socket.on("sendMessage", async (reqProps) => {
			try {
				const { firstName, lastName, userId, targetUserId, text } =
					reqProps;

				await validateChatRoom(userId, targetUserId);
				const roomId = getSecretRoomId(userId, targetUserId);

				let chat = await Chats?.findOne({
					participants: {
						$all: [userId, targetUserId],
					},
				});

				if (!chat) {
					chat = new Chats({
						participants: [userId, targetUserId],
						messages: [],
					});
				}

				chat.messages.push({
					senderId: userId,
					text,
				});

				await chat.save();

				io.to(roomId).emit("messageReceived", {
					firstName,
					text,
					lastName,
					_id: userId,
				});
			} catch (err) {
				throw new Error(`Error occurred: ${err}`);
			}
		});

		socket.on("disconnect", () => {});
	});
};

module.exports = initializeSocket;
