const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
	{
		toUserId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		fromUserId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		status: {
			type: String,
			enum: {
				values: ["ignored", "rejected", "accepted", "interested"],
				message: `{VALUE} is incorrect status type`,
			},
		},
	},
	{
		timestamps: true,
	}
);

connectionSchema.pre("save", function (next) {
	const connectionState = this;

	if (connectionState.fromUserId === connectionState.toUserId) {
		new Error(
			"You cannot send connection request to yourself [Schema Level]"
		);
	}

	next();
});

const Connections = mongoose.model("Connections", connectionSchema);
module.exports = Connections;
