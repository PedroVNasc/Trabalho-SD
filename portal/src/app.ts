import express from "express";
import mongoose from "mongoose";

console.log(`[PORTAL:0] Hello World!`);

const app = express();
const port = 3000; // Default port

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
