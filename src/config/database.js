const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose.connect(
		"mongodb+srv://ranasauravsinghdev:7qLRj2UnFoncghP2@cluster0.ng6zm9k.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
	);
};

module.exports = connectDB;
