import mongoose from "mongoose";

const mongoURI = "mongodb://mongo:27017/database";

console.log("Connecting to MongoDB at URI:", mongoURI);
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

export default db;
