import { Router } from "express";
import Prescription from "../models/Prescription";

const router = Router();

// POST /prescription
router.post("/prescription", async (req, res) => {
    console.log("# [POST] /prescription");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const { id, medicine, patient, doctor } = req.body;

        // Creating a new prescription and then saving it to the database
        const prescription = new Prescription({
            id,
            medicine,
            patient,
            doctor,
        });
        await prescription.save();

        // Tell the operator about the success
        console.log("<$> Prescription created:", prescription);

        // Tell the client about the success
        res.status(201).send(prescription);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating prescription:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /prescriptions
router.get("/prescriptions", async (req, res) => {
    console.log("# [GET] /prescriptions");

    try {
        // Retrieving all prescriptions from the database
        const prescriptions = await Prescription.find();

        // Tell the operator about the success
        console.log("<$> Prescriptions retrieved:", prescriptions);

        // Tell the client about the success
        res.status(200).send(prescriptions);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving prescriptions:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
