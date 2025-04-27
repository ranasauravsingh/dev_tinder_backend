const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	emailId: {
		type: String,
	},
	gender: {
		type: String,
	},
	phoneNumber: {
		type: Number,
	},
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
