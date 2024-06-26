// Important modules
import express from "express";
import mongoose from "mongoose";
import db from "./db";
import { create } from "domain";
import { connect2Kafka, createTopics } from "./kafka";
import { NAME, PORT } from "./config/constants";

// Importing routes
import userRoutes from "./routes/user-routes";
import { conlog, sleep } from "./utils/utils";

// Hello World!
console.log(`[PORTAL:0] Hello World!`);

// Creating the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// User routes
app.use(userRoutes);

// Start server function
const startServer = async () => {
    // Waiting for the Kafka server to be ready
    await sleep(5);

    // Connecting to MongoDB
    await db;

    // If this is the first portal, create Kafka topics
    if ("portal-0" === NAME) {
        await createTopics();
    }

    // Connecting to Kafka
    await connect2Kafka();

    // Starting the server
    app.listen(PORT, () => {
        console.log(`[${NAME}] Server running on http://localhost:${PORT}`);
    });

    // set a hello world every 10s
    setInterval(() => {
        conlog("Still standing!")
    }, 10 * 1000);
};

// Invoking the start server function
startServer();




