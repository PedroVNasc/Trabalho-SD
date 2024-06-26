// producer/src/routes/insurance-routes.ts
import express from "express";
import Insurance from "../models/insurance-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";

const router = express.Router();

// POST /insurance - Create a new insurance record
router.post("/insurance", async (req, res) => {
    console.log("# [POST] /insurance");

    try {
        console.log("<&> Received data:", req.body);

        const { region, name } = req.body;

        const insurance = new Insurance({
            region,
            name,
        });

        const taskData = await createTask("create/insurance", insurance);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating insurance record:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /insurance/:id - Get insurance record details
router.get("/insurance/:id", async (req, res) => {
    console.log("# [GET] /insurance/:id");

    try {
        const id = req.params.id;

        const insurance = await Insurance.findById(id).exec();

        if (!insurance) {
            console.error("<!> Insurance record not found with ID:", id);
            return res
                .status(404)
                .send({ error: "Insurance record not found" });
        }

        console.log("<$> Insurance record found:", insurance);
        res.status(200).send(insurance);
    } catch (error) {
        console.error("<!> Error getting insurance record:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /insurance/:id - Update insurance record details
router.put("/insurance/:id", async (req, res) => {
    console.log("# [PUT] /insurance/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const { region, name } = req.body;

        const insuranceExists = await Insurance.findById(id).exec();

        if (!insuranceExists) {
            kafkaLog(
                "update/insurance",
                {
                    error: "Can't update insurance record because it doesn't exist.",
                    data: { id, region, name },
                },
                `Error: Can't update insurance record because it doesn't exist.`
            );
            return res
                .status(404)
                .send({ error: "Insurance record not found" });
        }

        const taskData = await createTask("update/insurance", {
            id,
            region,
            name,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating insurance record:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /insurance/:id - Delete an insurance record
router.delete("/insurance/:id", async (req, res) => {
    console.log("# [DELETE] /insurance/:id");

    try {
        const id = req.params.id;

        const insuranceExists = await Insurance.findById(id).exec();

        if (!insuranceExists) {
            kafkaLog(
                "delete/insurance",
                {
                    error: "Can't delete insurance record because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete insurance record because it doesn't exist.`
            );
            return res
                .status(404)
                .send({ error: "Insurance record not found" });
        }

        const taskData = await createTask("delete/insurance", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting insurance record:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
