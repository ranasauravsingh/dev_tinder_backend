const Connections = require("../models/connection.schema");

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

module.exports = {
	receivedConnectionRequest,
    userConnections,
};
