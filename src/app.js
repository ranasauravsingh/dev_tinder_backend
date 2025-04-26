const express = require("express");

const app = express();

app?.get("/", (req, res) => {
    res?.send("Dev Tinder running");
});

app?.use("/test", (req, res) => {
    res?.send("This is test api route");
});

app?.listen(7777, (req, res) => {
    console.log("Server is running on port 7777");
});
