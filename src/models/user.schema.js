const mongoose = require("mongoose");
const validator = require("validator");

//? Schema Type ["https://mongoosejs.com/docs/schematypes.html"]
//? DB level validation

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			minlength: 4,
			maxlength: 20,
			required: true,
		},
		lastName: {
			type: String,
			maxlength: 20,
		},
		emailId: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
			validate(value) {
				if (!validator?.isEmail(value)) {
					throw new Error("Email is not valid");
				}
			},
		},
		password: {
			type: String,
			required: true,
			validate(value) {
				if (!validator?.isStrongPassword(value)) {
					throw new Error("Password is not strong enough");
				}
			},
		},
		age: {
			type: Number,
			min: 18,
			required: true,
		},
		gender: {
			type: String,
			validate(value) {
				//? Custom validation
				if (!["female", "male", "other"].includes(value)) {
					throw new Error("Gender data is not valid");
				}
			},
		},
		photoUrl: {
			type: String,
			default: "https://www.w3schools.com/howto/img_avatar.png",
			validate(value) {
				if (value && !validator?.isURL(value)) {
					throw new Error("Photo URL is not valid");
				}
			},
		},
		skills: {
			type: [String],
			enum: ["html", "css", "javascript", "react", "nodejs"],
		},
	},
	{
		timestamps: true, //? createdAt, updatedAt
	}
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
