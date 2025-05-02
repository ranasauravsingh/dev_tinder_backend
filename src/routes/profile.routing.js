const express = require("express");

//? Controllers
const {
	fetchProfile,
	updateProfile,
	updateUserPassword,
} = require("../controllers/profile.controller");

//? Middlewares
const userAuth = require("../middlewares/userAuth");

const profileRouter = express.Router();

//* All api prefixes will be "/profile" by default
profileRouter.get("/view", userAuth, fetchProfile);
profileRouter.patch("/edit", userAuth, updateProfile);
profileRouter.patch("/forgotPassword", userAuth, updateUserPassword);

module.exports = profileRouter;
