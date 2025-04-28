const validateSignUp = (req, res) => {
	const userData = req.body;
	const ALLOWED_KEYS = ["firstName", "emailId", "password", "age"];
	const isValidUserPayload = Object.keys(userData).every((key) =>
		ALLOWED_KEYS.includes(key)
	);

	if (!isValidUserPayload) {
		return res.status(400).send({
			message: "Invalid user data",
		});
	}

	if (
		!userData?.firstName ||
		!userData?.emailId ||
		!userData?.password ||
		!userData?.age
	) {
		return res.status(400).send({
			message:
				"Please provide all required fields [firstName, emailId, password, age]",
		});
	}

	const isFirstNameValid =
		userData?.firstName?.length >= 4 && userData?.firstName?.length <= 20;
	if (!isFirstNameValid) {
		return res.status(400).send({
			message: "First name should be between 4 to 20 characters",
		});
	}

	const isAgeValid = userData?.age >= 18;
	if (!isAgeValid) {
		return res.status(400).send({
			message: "Age should be greater than or equal to 18",
		});
	}
};

module.exports = {
	validateSignUp,
};
