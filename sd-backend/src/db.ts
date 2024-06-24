import mongoose from "mongoose";

const mongoURI = "mongodb://mongo:27017/database";

// Delay function
const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// Function to connect to MongoDB with retry logic
const connectWithRetry = async (
    uri: string,
    retries: number = 5,
    delayMs: number = 5000
) => {
    for (let i = 0; i < retries; i++) {
        try {
            await mongoose.connect(uri);
            console.log("Connected to MongoDB");
            return;
        } catch (err) {
            console.error(
                `Error connecting to MongoDB (attempt ${i + 1} of ${retries}):`,
                err
            );
            if (i < retries - 1) {
                console.log(
                    `Retrying to connect in ${delayMs / 1000} seconds...`
                );
                await delay(delayMs);
            } else {
                console.error(
                    "Failed to connect to MongoDB after multiple attempts"
                );
                process.exit(1);
            }
        }
    }
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

connectWithRetry(mongoURI);

export default db;
