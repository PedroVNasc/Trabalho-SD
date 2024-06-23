import { Router } from "express";
import Doctor from "../models/Doctor";

const router = Router();

// POST /doctor
router.post("/doctor", async (req, res) => {
    console.log("# [POST] /doctor");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const { id } = req.body;

        // Creating a new doctor and then saving it to the database
        const doctor = new Doctor({ id });
        await doctor.save();

        // Tell the operator about the success
        console.log("<$> Doctor created:", doctor);

        // Tell the client about the success
        res.status(201).send(doctor);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating doctor:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /doctors
router.get("/doctors", async (req, res) => {
    console.log("# [GET] /doctors");

    try {
        // Retrieving all doctors from the database
        const doctors = await Doctor.find();

        // Tell the operator about the success
        console.log("<$> Doctors retrieved:", doctors);

        // Tell the client about the success
        res.status(200).send(doctors);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving doctors:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
