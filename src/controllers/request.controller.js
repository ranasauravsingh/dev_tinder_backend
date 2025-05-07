const {
	validateSendConnection,
	validateReviewConnection,
} = require("../helpers/validation");
const Connections = require("../models/connection.schema");
const Users = require("../models/user.schema");

const sendConnectionRequest = async (req, res) => {
	try {
		validateSendConnection(req, res);

		const fromUserId = req?.user?._id;
		const { status, toUserId } = req?.params;

		const isValidToUserId = await Users.findById(toUserId);
		if (!isValidToUserId) {
			return res.status(400).send({
				message: "Invalid to user ID",
			});
		}

		const isConnectionAlreadyExists = await Connections.findOne({
			$or: [
				{ fromUserId, toUserId },
				{ fromUserId: toUserId, toUserId: fromUserId },
			],
		});

		if (isConnectionAlreadyExists) {
			return res.status(400).send({
				message: "Connection request already exists",
			});
		}

		const connectionRequest = await Connections({
			fromUserId,
			toUserId,
			status,
		});

		const connectionData = await connectionRequest.save();

		res.send({
			message: "Connection request sent successfully",
			data: connectionData,
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
};

const reviewConnectionRequest = async (req, res) => {
	try {
		validateReviewConnection(req, res);

		const toUserId = req?.user?._id;
		const { status, fromUserId } = req?.params;

		const isValidFromUserId = await Users.findById(fromUserId);
		if (!isValidFromUserId) {
			return res.status(400).send({
				message: "Invalid from user ID",
			});
		}

		const connectionRequest = await Connections.findOne({
			status: "interested",
			fromUserId,
			toUserId,
		});

		if (!connectionRequest) {
			return res.status(400).send({
				message: "Connection request not found",
			});
		}

		connectionRequest.status = status;
		const connectionData = await connectionRequest.save();

		res.send({
			message: "Connection request reviewed successfully",
			data: connectionData,
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
};

module.exports = {
	sendConnectionRequest,
	reviewConnectionRequest,
};
