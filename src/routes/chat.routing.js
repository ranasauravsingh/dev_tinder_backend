const express = require("express");

//? Controllers
const { fetchChats } = require("../controllers/chat.controller");

//? Middlewares
const userAuth = require("../middlewares/userAuth");

const chatRouter = express.Router();

//* All api prefixes will be "/chat" by default
chatRouter.get("/:targetUserId", userAuth, fetchChats);

module.exports = chatRouter;
