import { Router } from "express";
import Medicine from "../models/Medicine";

const router = Router();

// POST /medicine
router.post("/medicine", async (req, res) => {
    console.log("# [POST] /medicine");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const { id, label } = req.body;

        // Creating a new medicine and then saving it to the database
        const medicine = new Medicine({ id, label });
        await medicine.save();

        // Tell the operator about the success
        console.log("<$> Medicine created:", medicine);

        // Tell the client about the success
        res.status(201).send(medicine);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating medicine:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /medicines
router.get("/medicines", async (req, res) => {
    console.log("# [GET] /medicines");

    try {
        // Retrieving all medicines from the database
        const medicines = await Medicine.find();

        // Tell the operator about the success
        console.log("<$> Medicines retrieved:", medicines);

        // Tell the client about the success
        res.status(200).send(medicines);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving medicines:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
