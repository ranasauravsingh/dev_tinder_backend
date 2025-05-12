const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

//? DB Connection
const connectDB = require("./config/database");

//? Routes
const profileRouter = require("./routes/profile.routing");
const authRouter = require("./routes/auth.routing");
const connectionRouter = require("./routes/request.routing");
const userRouter = require("./routes/user.routing");

const app = express();

//? Fetching ENV variables
dotenv.config({
	path: "./.env",
});

app.use(cors({
	origin: process.env.FRONTEND_URL, //? React App URL
	credentials: true, //? Allow cookies to be sent with requests
})); //? Middleware to enable CORS
app.use(express.json()); //? Middleware to parse JSON data from request body
app.use(cookieParser()); //? Middleware to parse cookies from request headers

//? API's
app.use(`/user`, userRouter);
app.use(`/request`, connectionRouter);
app.use(`/profile`, profileRouter);
app.use(`/`, authRouter);

connectDB()
	.then(() => {
		const PORT = process.env.PORT;
		console.log("Connected to MongoDB successfully");
		app?.listen(PORT, (req, res) => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});
