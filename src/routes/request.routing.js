const express = require("express");

//? Controllers
const {
	sendConnectionRequest,
	reviewConnectionRequest,
} = require("../controllers/request.controller");

//? Middlewares
const userAuth = require("../middlewares/userAuth");

const connectionRouter = express.Router();

//* All api prefixes will be "/request" by default
connectionRouter.post(
	"/send/:status/:toUserId",
	userAuth,
	sendConnectionRequest
);
connectionRouter.post(
	"/review/:status/:fromUserId",
	userAuth,
	reviewConnectionRequest
);

module.exports = connectionRouter;
