const express = require("express");

//? Controllers
const {
	userRegistration,
	userLogin,
    userLogout,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", userRegistration);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);

module.exports = authRouter;
