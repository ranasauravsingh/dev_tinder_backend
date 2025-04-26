const express = require("express");

const app = express();

//? If writing "/", then all routes will be handle by this middleware
// app?.use("/", (req, res) => {
//     res?.send("Dev Tinder running");
// });

// app?.use("/hello", (req, res) => {
//     res?.send("hello hello hello");
// });

// app?.use("/test", (req, res) => {
//     res?.send("This is test api route");
// });


//? So to "/" must always be the last route, so that all other routes can be handled by their middlewares
// app?.use("/hello", (req, res) => {
//     res?.send("hello hello hello");
// });

// app?.use("/test", (req, res) => {
//     res?.send("This is test api route");
// });

// app?.use("/", (req, res) => {
//     res?.send("Dev Tinder running");
// });

//? HTTP methods api functions
app?.get("/users", (req, res) => {
    res?.send({ message: "Users fetch successfully" });
});
app?.post("/users", (req, res) => {
    res?.send({ message: "User created successfully" });
});
app?.delete("/users", (req, res) => {
    res?.send({ message: "User deleted successfully" });
});
app?.patch("/users", (req, res) => {
    res?.send({ message: "User data updated successfully" });
});

app?.listen(7777, (req, res) => {
    console.log("Server is running on port 7777");
});
