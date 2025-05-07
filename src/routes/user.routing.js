const express = require("express");

//? Controllers
const { receivedConnectionRequest } = require("../controllers/user.controller");

//? Middlewares
const userAuth = require("../middlewares/userAuth");

const userRouter = express.Router();

//* All api prefixes will be "/user" by default
userRouter.get("/requests/received", userAuth, receivedConnectionRequest);

module.exports = userRouter;
