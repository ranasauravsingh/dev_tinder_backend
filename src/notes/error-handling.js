const express = require("express");

const app = express();

//? 1) Error handling using app.use(err, req, res, next)
// app?.use("/test", (req, res) => {

//     throw new Error("asdadasdasdasd");
//     res.send("Hello World! This is a test route.");
// });

// app?.use("/test", (err, req, res, next) => {
//     if(err) {
//         res.status(500).send("Something broke!");
//     }
// });

//? 2) If error handling is used at top level, it will not catch the error [Order is important]
// app?.use("/test", (err, req, res, next) => {
// 	if (err) {
// 		res.status(500).send("Something broke!");
// 	}
// });

// app?.use("/test", (req, res) => {
// 	throw new Error("asdadasdasdasd");
// 	res.send("Hello World! This is a test route.");
// });

app?.listen(7777, (req, res) => {
    console.log("Server is running on port 7777");
});
