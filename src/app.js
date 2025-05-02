const express = require("express");
const cookieParser = require("cookie-parser");

//? DB Connection
const connectDB = require("./config/database");

//? Routes
const profileRouter = require("./routes/profile.routing");
const authRouter = require("./routes/auth.routing");

const app = express();

app.use(express.json()); //? Middleware to parse JSON data from request body
app.use(cookieParser()); //? Middleware to parse cookies from request headers

//? API's
app.use(`/profile`, profileRouter);
app.use(`/`, authRouter);

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
