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
import pharmacyRoutes from './routes/pharmacyRoutes'; // Importando as rotas de farmácias
import pharmacistRoutes from './routes/pharmacistRoutes'; // Importando as rotas de farmacêuticos
import prescriptionRequestRoutes from './routes/prescriptionRequestRoutes'; // Importando as rotas de solicitações de prescrição

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
app.use("/api", pharmacyRoutes); // Usando as rotas de farmácias
app.use("/api", pharmacistRoutes); // Usando as rotas de farmacêuticos
app.use("/api", prescriptionRequestRoutes); // Usando as rotas de solicitações de prescrição

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
