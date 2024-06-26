// producer/src/routes/prescription-request-routes.ts
import express from "express";
import PrescriptionRequest from "../models/prescription-request-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";

const router = express.Router();

// POST /prescription-request - Create a new prescription request
router.post("/prescription-request", async (req, res) => {
    console.log("# [POST] /prescription-request");

    try {
        console.log("<&> Received data:", req.body);

        const { prescription, approved, readiness, pharmacist, requestDate, deliveryDate, status } = req.body;

        const prescriptionRequest = new PrescriptionRequest({
            prescription,
            approved,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        });

        const taskData = await createTask("create/prescriptionRequest", prescriptionRequest);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating prescription request:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /prescription-request/:id - Get prescription request details
router.get("/prescription-request/:id", async (req, res) => {
    console.log("# [GET] /prescription-request/:id");

    try {
        const id = req.params.id;

        const prescriptionRequest = await PrescriptionRequest.findOne({ _id: id })
            .populate("prescription")
            .populate("pharmacist")
            .exec();

        if (!prescriptionRequest) {
            console.error("<!> Prescription request not found with ID:", id);
            return res.status(404).send({ error: "Prescription request not found" });
        }

        console.log("<$> Prescription request found:", prescriptionRequest);
        res.status(200).send(prescriptionRequest);
    } catch (error) {
        console.error("<!> Error getting prescription request:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /prescription-request/:id - Update prescription request details
router.put("/prescription-request/:id", async (req, res) => {
    console.log("# [PUT] /prescription-request/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const { prescription, approved, readiness, pharmacist, requestDate, deliveryDate, status } = req.body;

        const prescriptionRequestExists = await PrescriptionRequest.findOne({ _id: id }).exec();

        if (!prescriptionRequestExists) {
            kafkaLog(
                "update/prescriptionRequest",
                {
                    error: "Can't update prescription request because it doesn't exist.",
                    data: { id, prescription, approved, readiness, pharmacist, requestDate, deliveryDate, status },
                },
                `Error: Can't update prescription request because it doesn't exist.`
            );
            return res.status(404).send({ error: "Prescription request not found" });
        }

        const taskData = await createTask("update/prescriptionRequest", {
            id,
            prescription,
            approved,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating prescription request:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /prescription-request/:id - Delete a prescription request
router.delete("/prescription-request/:id", async (req, res) => {
    console.log("# [DELETE] /prescription-request/:id");

    try {
        const id = req.params.id;

        const prescriptionRequestExists = await PrescriptionRequest.findOne({ _id: id }).exec();
        
        if (!prescriptionRequestExists) {
            kafkaLog(
                "delete/prescriptionRequest",
                {
                    error: "Can't delete prescription request because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete prescription request because it doesn't exist.`
            );
            return res.status(404).send({ error: "Prescription request not found" });
        }

        const taskData = await createTask("delete/prescriptionRequest", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting prescription request:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
