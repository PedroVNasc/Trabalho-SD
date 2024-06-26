// Important modules
import express from "express";
import mongoose from "mongoose";
import db from "./db";
import { create } from "domain";
import { connect2Kafka, createTopics } from "./kafka";
import { NAME, PORT } from "./constants";

// Importing routes
import userRoutes from "./routes/user-routes";

// Hello World!
console.log(`[PORTAL:0] Hello World!`);

// Sleep function
function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
    await sleep(5000);

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
};

// Invoking the start server function
startServer();




