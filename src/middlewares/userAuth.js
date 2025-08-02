const jwt = require("jsonwebtoken");
const Users = require("../models/user.schema");
const { handleError } = require("../helpers/common_functions");

const userAuth = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		console.log.log("req", req);
		console.log("Token from cookies:", token);

		if (!token) {
			return res.status(401).send({
				message: "Token not found, please login again",
			});
		}

		const { _id: userId } = await jwt.verify(
			token,
			process.env.JWT_SECRET_KEY
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
		handleError(req, res, err);
	}
};

module.exports = userAuth;
