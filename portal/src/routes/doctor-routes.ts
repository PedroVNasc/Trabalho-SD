// producer/src/routes/doctor-routes.ts
import express from "express";
import Doctor from "../models/doctor-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";

const router = express.Router();

// POST /doctor - Create a new doctor
router.post("/doctor", async (req, res) => {
    console.log("# [POST] /doctor");

    try {
        console.log("<&> Received data:", req.body);

        const {
            id,
            name,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            specialty,
            licenseNumber,
            clinic,
        } = req.body;

        const doctor = new Doctor({
            id,
            name,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            specialty,
            licenseNumber,
            clinic,
        });

        const taskData = await createTask("create/doctor", doctor);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating doctor:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /doctor/:id - Get doctor details
router.get("/doctor/:id", async (req, res) => {
    console.log("# [GET] /doctor/:id");

    try {
        const id = req.params.id;

        const doctor = await Doctor.findOne({ id }).populate("clinic").exec();

        if (!doctor) {
            console.error("<!> Doctor not found with ID:", id);
            return res.status(404).send({ error: "Doctor not found" });
        }

        console.log("<$> Doctor found:", doctor);
        res.status(200).send(doctor);
    } catch (error) {
        console.error("<!> Error getting doctor:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /doctor/:id - Update doctor details
router.put("/doctor/:id", async (req, res) => {
    console.log("# [PUT] /doctor/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const {
            name,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            specialty,
            licenseNumber,
            clinic,
        } = req.body;

        const doctorExists = await Doctor.findOne({ id }).exec();

        if (!doctorExists) {
            kafkaLog(
                "update/doctor",
                {
                    error: "Can't update doctor because it doesn't exist.",
                    data: {
                        id,
                        name,
                        email,
                        phone,
                        address,
                        city,
                        state,
                        zipCode,
                        specialty,
                        licenseNumber,
                        clinic,
                    },
                },
                `Error: Can't update doctor because it doesn't exist.`
            );
            return res.status(404).send({ error: "Doctor not found" });
        }

        const taskData = await createTask("update/doctor", {
            id,
            name,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            specialty,
            licenseNumber,
            clinic,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating doctor:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /doctor/:id - Delete a doctor
router.delete("/doctor/:id", async (req, res) => {
    console.log("# [DELETE] /doctor/:id");

    try {
        const id = req.params.id;

        const doctorExists = await Doctor.findOne({ id }).exec();

        if (!doctorExists) {
            kafkaLog(
                "delete/doctor",
                {
                    error: "Can't delete doctor because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete doctor because it doesn't exist.`
            );
            return res.status(404).send({ error: "Doctor not found" });
        }

        const taskData = await createTask("delete/doctor", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting doctor:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
