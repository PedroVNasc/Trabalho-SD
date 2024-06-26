// producer/src/routes/prescription-routes.ts
import express from "express";
import Prescription from "../models/prescription-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";
import { v4 as uuid } from "uuid";

const router = express.Router();

// POST /prescription - Create a new prescription
router.post("/prescription", async (req, res) => {
    console.log("# [POST] /prescription");

    try {
        console.log("<&> Received data:", req.body);

        const { medicine, patient, doctor } = req.body;

        const id = uuid();

        const prescription = new Prescription({
            id,
            medicine,
            patient,
            doctor,
        });

        const taskData = await createTask("create/prescription", prescription);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating prescription:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /prescription/:id - Get prescription details
router.get("/prescription/:id", async (req, res) => {
    console.log("# [GET] /prescription/:id");

    try {
        const id = req.params.id;

        const prescription = await Prescription.findOne({ id })
            .populate("medicine")
            .populate("patient")
            .populate("doctor")
            .exec();

        if (!prescription) {
            console.error("<!> Prescription not found with ID:", id);
            return res.status(404).send({ error: "Prescription not found" });
        }

        console.log("<$> Prescription found:", prescription);
        res.status(200).send(prescription);
    } catch (error) {
        console.error("<!> Error getting prescription:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /prescription/:id - Update prescription details
router.put("/prescription/:id", async (req, res) => {
    console.log("# [PUT] /prescription/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const { medicine, patient, doctor } = req.body;

        const prescriptionExists = await Prescription.findOne({ id }).exec();

        if (!prescriptionExists) {
            kafkaLog(
                "update/prescription",
                {
                    error: "Can't update prescription because it doesn't exist.",
                    data: { id, medicine, patient, doctor },
                },
                `Error: Can't update prescription because it doesn't exist.`
            );
            return res.status(404).send({ error: "Prescription not found" });
        }

        const taskData = await createTask("update/prescription", {
            id,
            medicine,
            patient,
            doctor,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating prescription:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /prescription/:id - Delete a prescription
router.delete("/prescription/:id", async (req, res) => {
    console.log("# [DELETE] /prescription/:id");

    try {
        const id = req.params.id;

        const prescriptionExists = await Prescription.findOne({ id }).exec();
        
        if (!prescriptionExists) {
            kafkaLog(
                "delete/prescription",
                {
                    error: "Can't delete prescription because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete prescription because it doesn't exist.`
            );
            return res.status(404).send({ error: "Prescription not found" });
        }

        const taskData = await createTask("delete/prescription", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting prescription:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
