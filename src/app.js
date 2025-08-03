const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");

//? DB Connection
const connectDB = require("./config/database");

//? Socket Connection
const initializeSocket = require("./config/socket");

//? Routes
const profileRouter = require("./routes/profile.routing");
const authRouter = require("./routes/auth.routing");
const connectionRouter = require("./routes/request.routing");
const userRouter = require("./routes/user.routing");
const chatRouter = require("./routes/chat.routing");

const app = express();

//? Fetching ENV variables
dotenv.config({
	path: "./.env",
});

app.use(express.json()); //? Middleware to parse JSON data from request body
app.use(express.urlencoded({ extended: true })); //? Middleware to parse URL-encoded data from request body
app.use(cookieParser()); //? Middleware to parse cookies from request headers

app.set('trust proxy', 1); //? Trust first proxy

app.use(cors({
	origin: process.env.FRONTEND_URL, //? React App URL
	credentials: true, //? Allow cookies to be sent with requests
	methods: ["GET", "POST", "PATCH"], //? Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], //? Allowed headers
})); //? Middleware to enable CORS

//? API's
app.use(`/chat`, chatRouter);
app.use(`/user`, userRouter);
app.use(`/request`, connectionRouter);
app.use(`/profile`, profileRouter);
app.use(`/`, authRouter);

const server =  createServer(app);
initializeSocket(server);

connectDB()
	.then(() => {
		const PORT = process.env.PORT;
		console.log("Connected to MongoDB successfully");
		server?.listen(PORT, (req, res) => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});
