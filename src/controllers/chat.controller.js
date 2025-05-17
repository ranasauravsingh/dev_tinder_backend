const Chats = require("../models/chat.schema");
const Connections = require("../models/connection.schema");
const Users = require("../models/user.schema");

const { handleError } = require("../helpers/common_functions");
const { validateChatFetching } = require("../helpers/validation");

const fetchChats = async (req, res) => {
	try {
		const userId = req?.user?._id;
		const { targetUserId } = req?.params;

		validateChatFetching(req, res);

		const targetUser = await Users.findById(targetUserId);
		if (!targetUser) {
			return res.status(400).send({
				message: "Invalid target user",
			});
		}

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
			return res.status(400).send({
				message: "No connection exists with target user",
			});
		}

		// Ensure indexes on participants for faster queries
		await Chats.createIndexes({ participants: 1 });

		let chat = await Chats.findOne({
			participants: {
				$all: [userId, targetUserId],
			},
		})
			.select("messages")
			.populate({
				path: "messages.senderId",
				select: ["firstName", "lastName"],
			})
			.lean();

		if (!chat) {
			chat = new Chats({
				participants: [userId, targetUserId],
				messages: [],
			});
			await chat.save();
			chat = chat.toObject();
		}

		const responseData = chat.messages.map(({ senderId, text }) => ({
			firstName: senderId?.firstName,
			lastName: senderId?.lastName,
			text,
			_id: senderId?._id,
		}));

		res.send({
			data: responseData,
			message: "Chats fetched successfully",
		});
	} catch (err) {
		handleError(req, res, err);
	}
};

module.exports = {
	fetchChats,
};
