const express = require("express");

//? Controllers
const {
	receivedConnectionRequest,
	userConnections,
	userFeed,
} = require("../controllers/user.controller");

//? Middlewares
const userAuth = require("../middlewares/userAuth");

const userRouter = express.Router();

//* All api prefixes will be "/user" by default
userRouter.get("/requests/received", userAuth, receivedConnectionRequest);
userRouter.get("/connections", userAuth, userConnections);
userRouter.get("/feed", userAuth, userFeed);

module.exports = userRouter;
