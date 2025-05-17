const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Users",
		},
		text: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const chatSchema = new mongoose.Schema({
	participants: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
	],
	messages: [messageSchema],
});

const Chats = mongoose.model("Chats", chatSchema);
module.exports = Chats;
