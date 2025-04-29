const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const Users = require("./models/user.schema");
const { validateSignUp } = require("./helpers/validation");
const userAuth = require("./middlewares/userAuth");

const app = express();

app.use(express.json()); //? Middleware to parse JSON data from request body
app.use(cookieParser()); //? Middleware to parse cookies from request headers

//? 1) Create a user & login user
app.post("/signup", async (req, res) => {
	const { firstName, age, emailId, password } = req.body;
	try {
		validateSignUp(req, res);
		const passwordHash = await bcrypt.hash(password, 10);

		const user = new Users({
			firstName,
			age,
			emailId,
			password: passwordHash,
		});
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

app.post("/login", async (req, res) => {
	const { emailId, password } = req.body;

	try {
		const user = await Users.findOne({ emailId: emailId });
		if (!user) {
			return res.status(400).send({
				message: "Invalid Credentials",
			});
		}

		const isPasswordValid = await user?.validatePassword(password);;
		if (!isPasswordValid) {
			return res.status(400).send({
				message: "Invalid Credentials",
			});
		}

		const token = await user?.getJWT();

		res.cookie("token", token, {
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		});
		res.send({
			message: "Login Successful",
		});
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
});

//? 2) Get user profile
app.get("/profile", userAuth, async (req, res) => {
	try {
		const fetchUser = req.user;
		res.send(fetchUser);
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
