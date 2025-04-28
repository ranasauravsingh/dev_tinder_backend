const express = require("express");
const connectDB = require("./config/database");
const Users = require("./models/user.schema");

const app = express();

app.use(express.json());

//? 1) Create a user
app.post("/signup", async (req, res) => {
	const userData = req.body;
	try {
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
			userData?.firstName?.length >= 4 &&
			userData?.firstName?.length <= 20;
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

		const user = new Users(userData);
		await user.save();
		res.status(200).send({
			message: "User created successfully",
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
});

//? 2) Get all users
// app.get("/feed", async (req, res) => {
// 	try {
// 		const users = await Users.find({});

// 		if(users?.length === 0) {
// 			res.status(400).send({
// 				message: "No users found",
// 			});
// 		}
// 		else {
// 			res.send(users);
// 		}
// 	}
// 	catch(err) {
// 		res.status(400).send({
// 			message: `Something went wrong: ${err?.message}`,
// 		});
// 	}
// })

//? 3) Get user by ID
// app.post("/user", async (req, res) => {
// 	try {
// 		const userId = req.body.userId
// 		const user = await Users.find({ _id: userId});
// 		res.send(user);
// 	}
// 	catch(err) {
// 		res.status(400).send({
// 			message: `Something went wrong: ${err?.message}`,
// 		});
// 	}
// })

//? 4) Get user by email ID
// app.post("/user", async (req, res) => {
// 	try {
// 		const userEmail = req.body.emailId
// 		const user = await Users.find({ emailId: userEmail});
// 		res.send(user);
// 	}
// 	catch(err) {
// 		res.status(400).send({
// 			message: `Something went wrong: ${err?.message}`,
// 		});
// 	}
// })

//? 5) Delete user by ID
// app.delete("/user", async (req, res) => {
// 	try {
// 		const userId = req.body.userId;
// 		// const user = await Users.findOneAndDelete({ _id: userId});
// 		const user = await Users.findByIdAndDelete(userId);
// 		res.send("User deleted successfully");
// 	} catch (err) {
// 		res.status(400).send({
// 			message: `Something went wrong: ${err?.message}`,
// 		});
// 	}
// });

//? 6) Update user by ID
app.patch("/user/:userId", async (req, res) => {
	try {
		const userData = req.body;
		// const userId = req.body.userId;
		const userId = req.params?.userId;

		const ALLOWED_KEYS = [
			"firstName",
			"lastName",
			"gender",
			"photoUrl",
			"age",
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

		const isFirstNameValid =
			userData?.firstName?.length >= 4 &&
			userData?.firstName?.length <= 20;
		if (!isFirstNameValid) {
			return res.status(400).send({
				message: "First name should be between 4 to 20 characters",
			});
		}

		const isLastNameValid = userData?.lastName?.length <= 20;
		if (!isLastNameValid) {
			return res.status(400).send({
				message: "Last name should be lese than 20 characters",
			});
		}

		const isAgeValid = userData?.age >= 18;
		if (!isAgeValid) {
			return res.status(400).send({
				message: "Age should be greater than or equal to 18",
			});
		}

		// const user = await Users.findOneAndUpdate({ _id: userId});
		const user = await Users.findByIdAndUpdate(userId, userData, {
			returnDocument: "after",
			runValidators: true,
		});
		console.log(user);
		res.send("User updated successfully");
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
});

//? 7) Update user by EmailID
// app.patch("/user", async (req, res) => {
// 	try {
// 		const emailId = req.body.emailId;
// 		const userData = req.body;
// 		const user = await Users.findOneAndUpdate({ emailId }, userData);
// 		res.send("User updated successfully");
// 	} catch (err) {
// 		res.status(400).send({
// 			message: `Something went wrong: ${err?.message}`,
// 		});
// 	}
// });

connectDB()
	.then(() => {
		console.log("Connected to MongoDB successfully");
		app?.listen(7777, (req, res) => {
			console.log("Server is running on port 7777");
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});
