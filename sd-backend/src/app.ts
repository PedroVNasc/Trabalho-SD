// Importing dependencies
import express from "express";

// Importing the database connection
import "./db"; 

// Importing the routes
import userRoutes from "./routes/userRoutes";
import doctorRoutes from './routes/doctorRoutes';
import insuranceRoutes from './routes/insuranceRoutes';
import medicineRoutes from './routes/medicineRoutes';
import prescriptionRoutes from './routes/prescriptionRoutes';

// NOTE: use locust for benchmarking

// Important variables
const port = process.env.PORT || 3000; // Port number

// Creating an express application
const app = express();

// Use the json middleware to parse the request body
app.use(express.json());

// Use the routes
app.use("/api", userRoutes);
app.use("/api", doctorRoutes);
app.use("/api", insuranceRoutes);
app.use("/api", medicineRoutes);
app.use("/api", prescriptionRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
