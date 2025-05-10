const { handleError } = require("../helpers/common_functions");
const { validateProfileUpdate } = require("../helpers/validation");

const fetchProfile = async (req, res) => {
	try {
		const fetchUser = req.user;
		res.send(fetchUser);
	} catch (err) {
		handleError(req, res, err);
	}
};

const updateProfile = async (req, res) => {
	try {
		validateProfileUpdate(req, res);

		const loggedInUser = req?.user;
		const requestBody = req?.body;

		Object.keys(requestBody).forEach(
			(key) => (loggedInUser[key] = requestBody[key])
		);

		await loggedInUser?.save();

		res.send({
			message: "Profile updated successfully",
			user: loggedInUser,
		});
	} catch (err) {
		handleError(req, res, err);
	}
};

const updateUserPassword = async (req, res) => {
	try {
		const loggedInUser = req?.user;
		const { oldPassword, newPassword, confirmPassword } = req?.body;

		if (!oldPassword || !newPassword || !confirmPassword) {
			return res.status(400).send({
				message:
					"Please provide all fields [oldPassword, newPassword, confirmPassword]",
			});
		}

		const isPasswordValid = await loggedInUser?.validatePassword(
			oldPassword
		);
		if (!isPasswordValid) {
			return res.status(400).send({
				message: "Old password is not valid",
			});
		}

		if (newPassword !== confirmPassword) {
			return res.status(400).send({
				message: "New password and confirm password do not match",
			});
		}

		const passwordHash = await bcrypt.hash(newPassword, 10);
		loggedInUser.password = passwordHash;
		await loggedInUser?.save();

		res.send({
			message: "Password updated successfully",
		});
	} catch (err) {
		handleError(req, res, err);
	}
};

module.exports = {
	fetchProfile,
	updateProfile,
	updateUserPassword,
};
