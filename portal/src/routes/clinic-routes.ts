// producer/src/routes/clinic-routes.ts
import express from "express";
import Clinic from "../models/clinic-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";

const router = express.Router();

// POST /clinic - Create a new clinic
router.post("/clinic", async (req, res) => {
    console.log("# [POST] /clinic");

    try {
        console.log("<&> Received data:", req.body);

        const { id, region, users } = req.body;

        const clinic = new Clinic({
            id,
            region,
            users,
        });

        const taskData = await createTask("create/clinic", clinic);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating clinic:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /clinic/:id - Get clinic details
router.get("/clinic/:id", async (req, res) => {
    console.log("# [GET] /clinic/:id");

    try {
        const id = req.params.id;

        const clinic = await Clinic.findOne({ id }).populate("users").exec();

        if (!clinic) {
            console.error("<!> Clinic not found with ID:", id);
            return res.status(404).send({ error: "Clinic not found" });
        }

        console.log("<$> Clinic found:", clinic);
        res.status(200).send(clinic);
    } catch (error) {
        console.error("<!> Error getting clinic:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /clinic/:id - Update clinic details
router.put("/clinic/:id", async (req, res) => {
    console.log("# [PUT] /clinic/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const { region, users } = req.body;

        const clinicExists = await Clinic.findOne({ id }).exec();

        if (!clinicExists) {
            kafkaLog(
                "update/clinic",
                {
                    error: "Can't update clinic because it doesn't exist.",
                    data: { id, region, users },
                },
                `Error: Can't update clinic because it doesn't exist.`
            );
            return res.status(404).send({ error: "Clinic not found" });
        }

        const taskData = await createTask("update/clinic", {
            id,
            region,
            users,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating clinic:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /clinic/:id - Delete a clinic
router.delete("/clinic/:id", async (req, res) => {
    console.log("# [DELETE] /clinic/:id");

    try {
        const id = req.params.id;

        const clinicExists = await Clinic.findOne({ id }).exec();

        if (!clinicExists) {
            kafkaLog(
                "delete/clinic",
                {
                    error: "Can't delete clinic because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete clinic because it doesn't exist.`
            );
            return res.status(404).send({ error: "Clinic not found" });
        }

        const taskData = await createTask("delete/clinic", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting clinic:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
