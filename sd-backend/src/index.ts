import express from "express";
import { connectToDatabase } from "./db";
import sampleRoute from "./routes/sampleRoute";

const app = express();
const port = 3000;

connectToDatabase().then(() => {
    app.use("/api", sampleRoute);

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
