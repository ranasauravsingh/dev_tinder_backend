const jwt = require("jsonwebtoken");
const Users = require("../models/user.schema");

const userAuth = async (req, res, next) => {
	try {
		const { token } = req.cookies;

		if (!token) {
			return res.status(400).send({
				message: "Token not found",
			});
		}

		const { _id: userId } = await jwt.verify(
			token,
			"THIS_IS_JWT_SECRET_KEY"
		);

		if (!userId) {
			return res.status(400).send({
				message: "Invalid Token",
			});
		}

		const fetchUser = await Users.findById(userId);
		req.user = fetchUser;
		next();
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
};

module.exports = userAuth;
