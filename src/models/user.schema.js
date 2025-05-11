const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
		},
		gender: {
			type: String,
			enum: {
				values: ["female", "male", "other"],
				message: `{VALUE} is not a valid gender type`,
			},
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
		about: {
			type: String,
			default: "Hello, I am using this app",
			maxlength: 200,
			validate(value) {
				if (value && value.length > 200) {
					throw new Error(
						"About section should be less than 200 characters"
					);
				}
			},
		},
		skills: {
			type: [String],
			// enum: ["html", "css", "javascript", "reactjs", "nodejs"],
		},
	},
	{
		timestamps: true, //? createdAt, updatedAt
	}
);

userSchema.methods.getJWT = async function () {
	const user = this;
	const token = await jwt.sign({ _id: user?._id }, "THIS_IS_JWT_SECRET_KEY", {
		expiresIn: "7d",
	});
	return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
	const user = this;
	const userPassword = user?.password;

	const isPasswordValid = await bcrypt.compare(
		passwordInputByUser,
		userPassword
	);

	return isPasswordValid;
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
