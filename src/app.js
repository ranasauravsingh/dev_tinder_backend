const express = require("express");
const connectDB = require("./config/database");
const Users = require("./models/user.schema");

const app = express();

app.post("/signup", async (req, res) => {
	const userData = {
		firstName: "Saurav Singh",
		lastName: "Rana",
		gender: "male",
		phoneNumber: 1234567890,
		emailId: "saurav@test.com",
	};

	try {
		const user = new Users(userData);
		await user.save();
		res.status(200).send({
			message: "User created successfully",
		})
	} catch (err) {
		res.status(400).send({
			message: `Something went wrong: ${err?.message}`,
		});
	}
});

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
