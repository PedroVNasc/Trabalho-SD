// producer/src/routes/pharmacist-routes.ts
import express from "express";
import Pharmacist from "../models/pharmacist-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";
import { v4 as uuid } from "uuid";

const router = express.Router();

// POST /pharmacist - Create a new pharmacist
router.post("/pharmacist", async (req, res) => {
    console.log("# [POST] /pharmacist");

    try {
        console.log("<&> Received data:", req.body);

        const {
            // id,
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        } = req.body;

        const id = uuid();

        const pharmacist = new Pharmacist({
            id,
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        });

        const taskData = await createTask("create/pharmacist", pharmacist);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating pharmacist:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /pharmacist/:id - Get pharmacist details
router.get("/pharmacist/:id", async (req, res) => {
    console.log("# [GET] /pharmacist/:id");

    try {
        const id = req.params.id;

        const pharmacist = await Pharmacist.findOne({ id })
            .populate("pharmacyId")
            .exec();

        if (!pharmacist) {
            console.error("<!> Pharmacist not found with ID:", id);
            return res.status(404).send({ error: "Pharmacist not found" });
        }

        console.log("<$> Pharmacist found:", pharmacist);
        res.status(200).send(pharmacist);
    } catch (error) {
        console.error("<!> Error getting pharmacist:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /pharmacist/:id - Update pharmacist details
router.put("/pharmacist/:id", async (req, res) => {
    console.log("# [PUT] /pharmacist/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const {
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        } = req.body;

        const pharmacistExists = await Pharmacist.findOne({ id }).exec();

        if (!pharmacistExists) {
            kafkaLog(
                "update/pharmacist",
                {
                    error: "Can't update pharmacist because it doesn't exist.",
                    data: {
                        id,
                        region,
                        name,
                        address,
                        phone,
                        email,
                        licenseNumber,
                        pharmacyId,
                    },
                },
                `Error: Can't update pharmacist because it doesn't exist.`
            );
            return res.status(404).send({ error: "Pharmacist not found" });
        }

        const taskData = await createTask("update/pharmacist", {
            id,
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating pharmacist:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /pharmacist/:id - Delete a pharmacist
router.delete("/pharmacist/:id", async (req, res) => {
    console.log("# [DELETE] /pharmacist/:id");

    try {
        const id = req.params.id;

        const pharmacistExists = await Pharmacist.findOne({ id }).exec();

        if (!pharmacistExists) {
            kafkaLog(
                "delete/pharmacist",
                {
                    error: "Can't delete pharmacist because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete pharmacist because it doesn't exist.`
            );
            return res.status(404).send({ error: "Pharmacist not found" });
        }

        const taskData = await createTask("delete/pharmacist", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting pharmacist:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
