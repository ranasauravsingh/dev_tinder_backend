const Connections = require("../models/connection.schema");

const receivedConnectionRequest = async (req, res) => {
	try {
		const toUserId = req?.user?._id;

		const connectionRequest = await Connections.find({
			toUserId,
			status: "interested",
		}).populate("fromUserId", [
			"firstName",
			"lastName",
			"photoUrl",
			"gender",
		]);

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

module.exports = {
	receivedConnectionRequest,
};
