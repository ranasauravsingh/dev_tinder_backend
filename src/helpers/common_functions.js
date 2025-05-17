const crypto = require("crypto");

const handleError = (req, res, err) => {
	res.status(400).send({
		message: `Something went wrong: ${err?.message}`,
	});
};

const getSecretRoomId = (userId, targerUserId) => {
	return crypto
		?.createHash("sha256")
		?.update([userId, targerUserId]?.sort()?.join("_"))
		?.digest("hex");
};

module.exports = {
	handleError,
	getSecretRoomId,
};
