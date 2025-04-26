const express = require("express");

const app = express();

//? 1) Middlewares
// app.use("/test", (req, res, next) => {
//     console.log("Middleware");
//     next();
// }, (req, res) => {
//     res.send("Route handler");
// });

//? 2) Example of using middleware, Handle auth middleware for all GET, POST, PUT, DELETE requests [app.use()]
// app?.use("/admin", (req, res, next) => {
// 	const token = "xyz123";
// 	const isAdmin = token === "xyz123";

// 	if (!isAdmin) {
// 		return res.status(401).send("Unauthorized access");
// 	} else {
// 		next();
// 	}
// });

// app?.get("/admin/test", (req, res, next) => {
// 	res.send("Admin Products Route Handler");
// });

// app?.delete("/admin/test", (req, res, next) => {
// 	res.send("Admin Products Route Handler");
// });

//? 3) Example of using middleware common function.
// const adminAuth = (req, res, next) => {
// 	const token = "xyz123";
// 	const isAdmin = token === "xyz123";

// 	if (!isAdmin) {
// 		return res.status(401).send("Unauthorized access");
// 	} else {
// 		next();
// 	}
// };

// app?.get("/admin/test", adminAuth, (req, res, next) => {
// 	res.send("Admin Products Route Handler");
// });

// app?.delete("/admin/test", adminAuth, (req, res, next) => {
// 	res.send("Admin Products Route Handler");
// });

app?.listen(7777, (req, res) => {
	console.log("Server is running on port 7777");
});
