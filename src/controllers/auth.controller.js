const bcrypt = require("bcrypt");

const { validateSignUp } = require("../helpers/validation");
const Users = require("../models/user.schema");
const { handleError } = require("../helpers/common_functions");

const userRegistration = async (req, res) => {
	const { firstName, lastName, emailId, password } = req.body;
	try {
		validateSignUp(req, res);
		const passwordHash = await bcrypt.hash(password, 10);

		const user = new Users({
			firstName,
			lastName,
			emailId,
			password: passwordHash,
		});
		const savedUser = await user.save();
		const token = await savedUser?.getJWT();

		res.cookie("token", token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});
		res.status(200).send({
			message: "User created successfully",
			data: savedUser,
		});
	} catch (err) {
		handleError(req, res, err);
	}
};

const userLogin = async (req, res) => {
	const { emailId, password } = req.body;

	try {
		const user = await Users.findOne({ emailId: emailId });
		if (!user) {
			return res.status(400).send({
				message: "Invalid Credentials",
			});
		}

		const isPasswordValid = await user?.validatePassword(password);
		if (!isPasswordValid) {
			return res.status(400).send({
				message: "Invalid Credentials",
			});
		}

		const token = await user?.getJWT();

		res.cookie("token", token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
			httpOnly: true, // Prevents client-side JS access
			secure: true, // Required for HTTPS on Render
			sameSite: "none", // Allows cross-origin cookie sending
		});
		res.send({
			data: user,
			message: "Login Successful",
		});
	} catch (err) {
		handleError(req, res, err);
	}
};

const userLogout = async (req, res) => {
	res.cookie("token", null, { expires: new Date(Date.now()) });
	res.send({
		message: `Logout Successful`,
	});
};

module.exports = {
	userRegistration,
	userLogin,
	userLogout,
};
