import { MongoClient } from "mongodb";

const url = "example-url";
const client = new MongoClient(url);

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        process.exit(1);
    }
}

export const db = client.db("my-database");
