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

const validateProfileUpdate = (req, res) => {
	const userData = req.body;
	const ALLOWED_KEYS = [
		"age",
		"firstName",
		"lastName",
		"photoUrl",
		"gender",
		"about",
		"skills",
	];

	const isValidUserPayload = Object.keys(userData).every((key) =>
		ALLOWED_KEYS.includes(key)
	);

	if (!isValidUserPayload) {
		return res.status(400).send({
			message: "Invalid user data",
		});
	}

	if (
		!userData?.firstName &&
		!userData?.lastName &&
		!userData?.photoUrl &&
		!userData?.gender &&
		!userData?.about &&
		!(userData?.skills?.length > 0) &&
		!(userData?.age > 0)
	) {
		return res.status(400).send({
			message:
				"Please provide all fields [firstName, lastName, photoUrl, age, gender, about, skills]",
		});
	}

	if (userData?.firstName) {
		const isFirstNameValid =
			userData?.firstName?.length >= 4 &&
			userData?.firstName?.length <= 20;
		if (!isFirstNameValid) {
			return res.status(400).send({
				message: "First name should be between 4 to 20 characters",
			});
		}
	}

	if (userData?.lastName) {
		const isLastNameValid = userData?.lastName?.length <= 20;
		if (!isLastNameValid) {
			return res.status(400).send({
				message: "First name should be between 4 to 20 characters",
			});
		}
	}

	if (userData?.age) {
		const isAgeValid = userData?.age >= 18;
		if (!isAgeValid) {
			return res.status(400).send({
				message: "Age should be greater than or equal to 18",
			});
		}
	}

	if (userData?.skills?.length > 10) {
		return res.status(400).send({
			message: "Skills should be less than or equal to 10",
		});
	}
};

const validateSendConnection = (req, res) => {
	const fromUserId = req?.user?._id;
	const { status, toUserId } = req?.params;

	if (!fromUserId && !toUserId && !status) {
		return res.status(400).send({
			message: "Please provide all required fields [toUserId, status]",
		});
	}

	if (fromUserId === toUserId) {
		return res.status(400).send({
			message: "You cannot send connection request to yourself",
		});
	}

	const ALLOWED_PARAMS = ["ignored", "interested"];
	if (!ALLOWED_PARAMS?.includes(status)) {
		return res.status(400).send({
			message: "Invalid status type: " + status,
		});
	}
};

module.exports = {
	validateSignUp,
	validateProfileUpdate,
	validateSendConnection,
};
