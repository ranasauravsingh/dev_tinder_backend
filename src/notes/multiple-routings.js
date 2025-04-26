const express = require("express");

const app = express();

//? 1) If in a route handler, if not responding, the request will hang until the timeout is reached
// app?.use("/test", (req, res) => {
//     // route handlers
//     console.log("Hello World! This is a test route.");
//     // res.send("Hello World! This is a test route.");
// });

//? 2) If there is multiple route handlers, the first one will respond to the request and the second one will not be executed
//? If you want to execute multiple route handlers, you can use the next() function to pass control to the next handler
// app?.use(
// 	"/test",
// 	(req, res, next) => {
// 		console.log("Route handler 1.");
// 		// res.send("Route handler 1.");
// 		next();
// 	},
// 	(req, res) => {
// 		console.log("Route handler 2.");
// 		res.send("Route handler 2.");
// 	}
// );

//? 3) If in first route handler if res.send is called first and then next(), the first route handler will respond but for second one, it will show error in terminal
// app?.use(
// 	"/test",
// 	(req, res, next) => {
// 		console.log("Route handler 1.");
// 		res.send("Route handler 1.");
// 		next();
// 	},
// 	(req, res) => {
// 		console.log("Route handler 2.");
// 		res.send("Route handler 2.");
// 	}
// );

//? 4) If in first route handler if next() is called first and then res.send, the first route handler will skip to the second one and the second one will respond to the request
//? but the first one will not respond and it will show error in terminal
// app?.use(
// 	"/test",
// 	(req, res, next) => {
// 		console.log("Route handler 1.");
// 		next();
// 		res.send("Route handler 1.");
// 	},
// 	(req, res) => {
// 		console.log("Route handler 2.");
// 		res.send("Route handler 2.");
// 	}
// );

//? 5) If both the route handlers are using next() and are not request of last handler will give route not found error
// app?.use(
// 	"/test",
// 	(req, res, next) => {
// 		console.log("Route handler 1.");
// 		next();
// 		// res.send("Route handler 1.");
// 	},
// 	(req, res, next) => {
// 		console.log("Route handler 2.");
// 		// res.send("Route handler 2.");
// 		next();
// 	}
// );

//? 5) Also route handler can also be in array format, it will work the same way as above
// app?.use("/test", [
// 	(req, res, next) => {
// 		console.log("Route handler 1.");
// 		next();
// 		// res.send("Route handler 1.");
// 	},
// 	(req, res, next) => {
// 		console.log("Route handler 2.");
// 		res.send("Route handler 2.");
// 		// next();
// 	},
// ]);

app?.listen(7777, (req, res) => {
    console.log("Server is running on port 7777");
});
