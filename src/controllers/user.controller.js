const Connections = require("../models/connection.schema");
const Users = require("../models/user.schema");

const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "gender"];

const receivedConnectionRequest = async (req, res) => {
	try {
		const toUserId = req?.user?._id;

		const connectionRequest = await Connections.find({
			toUserId,
			status: "interested",
		}).populate("fromUserId", USER_SAFE_DATA);

		if (!connectionRequest) {
			return res.status(400).send({
				message: "No connection request found",
			});
		}

		res.send({
			message: "Connection request received successfully",
			data: connectionRequest,
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
};

const userConnections = async (req, res) => {
	try {
		const loggedInUserId = req?.user?._id;

		const connections = await Connections.find({
			$or: [
				{ fromUserId: loggedInUserId, status: "accepted" },
				{ toUserId: loggedInUserId, status: "accepted" },
			],
		})
			.populate("fromUserId", USER_SAFE_DATA)
			.populate("toUserId", USER_SAFE_DATA);

		if (!connections) {
			return res.status(400).send({
				message: "No connections found",
			});
		}

		const connectionsData = connections?.map((connection) => {
			if (
				connection?.fromUserId?._id?.toString() ===
				loggedInUserId?.toString()
			) {
				return connection?.toUserId;
			}
			return connection?.fromUserId;
		});

		res.send({
			message: "User connections received successfully",
			data: connectionsData,
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
};

const userFeed = async (req, res) => {
	try {
		//? User should be able see all the users except
		//? 0. his own card
		//? 1. his own connections
		//? 2. ignored connections
		//? 3. already sent connection requests

		const loggedInUserId = req?.user?._id;
		const page_count = parseInt(req?.query?.page) || 1;
		const limit = parseInt(req?.query?.limit) || 10;
		
		if(limit > 50) {
			return res.status(400).send({
				message: "Limit should be less than or equal to 50",
			});
		}
		const skip =  (page_count - 1) * limit;

		//? Get all the connections of the logged in user
		const connections = await Connections.find({
			$or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
		}).select(["fromUserId", "toUserId"]);

		const hideUserData = new Set();

		//? Get all unique user ids from the connections
		connections?.forEach((connection) => {
			hideUserData.add(connection?.fromUserId?.toString());
			hideUserData.add(connection?.toUserId?.toString());
		});

		//? Get all the users which are not in the hideUserData set
		//? and also not the logged in user id
		//? use skip() and limit() to paginate the data
		const userFeedList = await Users.find({
			$and: [
				{ _id: { $nin: Array.from(hideUserData) } },
				{ _id: { $ne: loggedInUserId } },
			],
		})
			.select(USER_SAFE_DATA)
			.skip(skip)
			.limit(limit);

		res.send({
			message: "User feed received successfully",
			data: userFeedList,
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
};

module.exports = {
	receivedConnectionRequest,
	userConnections,
	userFeed,
};
