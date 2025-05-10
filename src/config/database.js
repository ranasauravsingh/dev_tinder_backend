const mongoose = require("mongoose");

const connectDB = async () => {
	const DB = process.env.DATABASE;
	await mongoose.connect(DB);
};

module.exports = connectDB;
