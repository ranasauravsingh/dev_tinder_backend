const express = require("express");

//? Controllers
const { sendConnectionRequest } = require("../controllers/request.controller");

//? Middlewares
const userAuth = require("../middlewares/userAuth");

const connectionRouter = express.Router();

//* All api prefixes will be "/request" by default
connectionRouter.post("/send/:status/:userId", userAuth, sendConnectionRequest);

module.exports = connectionRouter;
