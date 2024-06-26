// producer/src/routes/pharmacy-routes.ts
import express from "express";
import Pharmacy from "../models/pharmacy-model";
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";
import { v4 as uuid } from "uuid";

const router = express.Router();

// POST /pharmacy - Create a new pharmacy
router.post("/pharmacy", async (req, res) => {
    console.log("# [POST] /pharmacy");

    try {
        console.log("<&> Received data:", req.body);

        const { region, name, address, medicines } = req.body;

        const id = uuid();

        const pharmacy = new Pharmacy({
            id,
            region,
            name,
            address,
            medicines,
        });

        const taskData = await createTask("create/pharmacy", pharmacy);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error creating pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /pharmacy/:id - Get pharmacy details
router.get("/pharmacy/:id", async (req, res) => {
    console.log("# [GET] /pharmacy/:id");

    try {
        const id = req.params.id;

        const pharmacy = await Pharmacy.findOne({ id }).exec();

        if (!pharmacy) {
            console.error("<!> Pharmacy not found with ID:", id);
            return res.status(404).send({ error: "Pharmacy not found" });
        }

        console.log("<$> Pharmacy found:", pharmacy);
        res.status(200).send(pharmacy);
    } catch (error) {
        console.error("<!> Error getting pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /pharmacies - Get all pharmacies
router.get("/pharmacies", async (req, res) => {
    console.log("# [GET] /pharmacies");

    try {
        const pharmacies = await Pharmacy.find(
            {},
            "id region name address"
        ).exec();

        console.log("<$> Pharmacies found:", pharmacies);
        res.status(200).send(pharmacies);
    } catch (error) {
        console.error("<!> Error getting pharmacies:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /pharmacy/:id - Update pharmacy details
router.put("/pharmacy/:id", async (req, res) => {
    console.log("# [PUT] /pharmacy/:id");

    try {
        console.log("<&> Received data for update:", req.body);

        const id = req.params.id;
        const { region, name, address, medicines } = req.body;

        const pharmacyExists = await Pharmacy.findOne({ id }).exec();

        if (!pharmacyExists) {
            kafkaLog(
                "update/pharmacy",
                {
                    error: "Can't update pharmacy because it doesn't exist.",
                    data: { id, region, name, address, medicines },
                },
                `Error: Can't update pharmacy because it doesn't exist.`
            );
            return res.status(404).send({ error: "Pharmacy not found" });
        }

        const taskData = await createTask("update/pharmacy", {
            id,
            region,
            name,
            address,
            medicines,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /pharmacy/:id - Delete a pharmacy
router.delete("/pharmacy/:id", async (req, res) => {
    console.log("# [DELETE] /pharmacy/:id");

    try {
        const id = req.params.id;

        const pharmacyExists = await Pharmacy.findOne({ id }).exec();

        if (!pharmacyExists) {
            kafkaLog(
                "delete/pharmacy",
                {
                    error: "Can't delete pharmacy because it doesn't exist.",
                    data: { id },
                },
                `Error: Can't delete pharmacy because it doesn't exist.`
            );
            return res.status(404).send({ error: "Pharmacy not found" });
        }

        const taskData = await createTask("delete/pharmacy", { id });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /pharmacy/:id/medicines - Get all medicines in a pharmacy
router.get("/pharmacy/:id/medicines", async (req, res) => {
    console.log("# [GET] /pharmacy/:id/medicines");

    try {
        const id = req.params.id;

        const pharmacy = await Pharmacy.findOne({ id }).exec();

        if (!pharmacy) {
            console.error("<!> Pharmacy not found with ID:", id);
            return res.status(404).send({ error: "Pharmacy not found" });
        }

        console.log("<$> Medicines found in pharmacy:", pharmacy.medicines);
        res.status(200).send(pharmacy.medicines);
    } catch (error) {
        console.error("<!> Error getting medicines in pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// POST /pharmacy/:id/medicine - Add a new medicine to the pharmacy
router.post("/pharmacy/:id/medicine", async (req, res) => {
    console.log("# [POST] /pharmacy/:id/medicine");

    try {
        const id = req.params.id;
        const newMedicine = req.body;

        const pharmacy = await Pharmacy.findOne({ id }).exec();

        if (!pharmacy) {
            console.error("<!> Pharmacy not found with ID:", id);
            return res.status(404).send({ error: "Pharmacy not found" });
        }

        pharmacy.medicines.push(newMedicine);

        const taskData = await createTask("add/medicine", {
            pharmacyId: id,
            medicine: newMedicine,
        });

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Error adding medicine to pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /pharmacy/:id/medicine/:medicineId - Update medicine details in the pharmacy
router.put("/pharmacy/:id/medicine/:medicineId", async (req, res) => {
    console.log("# [PUT] /pharmacy/:id/medicine/:medicineId");

    try {
        const { id, medicineId } = req.params;
        const updatedMedicine = req.body;

        const pharmacy = await Pharmacy.findOneAndUpdate(
            { id, "medicines.id": medicineId },
            {
                $set: {
                    "medicines.$": updatedMedicine,
                },
            },
            { new: true }
        ).exec();

        if (!pharmacy) {
            console.error(
                "<!> Pharmacy or medicine not found with given IDs:",
                id,
                medicineId
            );
            return res
                .status(404)
                .send({ error: "Pharmacy or medicine not found" });
        }

        const taskData = await createTask("update/medicine", {
            pharmacyId: id,
            medicineId,
            updatedMedicine,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error updating medicine in pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /pharmacy/:id/medicine/:medicineId - Remove a medicine from the pharmacy
router.delete("/pharmacy/:id/medicine/:medicineId", async (req, res) => {
    console.log("# [DELETE] /pharmacy/:id/medicine/:medicineId");

    try {
        const { id, medicineId } = req.params;

        const pharmacy = await Pharmacy.findOneAndUpdate(
            { id },
            {
                $pull: { medicines: { id: medicineId } },
            },
            { new: true }
        ).exec();

        if (!pharmacy) {
            console.error(
                "<!> Pharmacy or medicine not found with given IDs:",
                id,
                medicineId
            );
            return res
                .status(404)
                .send({ error: "Pharmacy or medicine not found" });
        }

        const taskData = await createTask("delete/medicine", {
            pharmacyId: id,
            medicineId,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Error deleting medicine from pharmacy:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /pharmacy/:id/medicine/:medicineId/quantity - Update quantity of a medicine in stock
router.put("/pharmacy/:id/medicine/:medicineId/quantity", async (req, res) => {
    console.log("# [PUT] /pharmacy/:id/medicine/:medicineId/quantity");

    try {
        const { id, medicineId } = req.params;
        const { quantity } = req.body;

        if (!quantity || typeof quantity !== "number") {
            return res.status(400).send({ error: "Invalid quantity provided" });
        }

        const pharmacy = await Pharmacy.findOneAndUpdate(
            { id, "medicines.id": medicineId },
            { $set: { "medicines.$.quantity": quantity } },
            { new: true }
        ).exec();

        if (!pharmacy) {
            console.error(
                "<!> Pharmacy or medicine not found with given IDs:",
                id,
                medicineId
            );
            return res
                .status(404)
                .send({ error: "Pharmacy or medicine not found" });
        }

        const taskData = await createTask("update/medicineQuantity", {
            pharmacyId: id,
            medicineId,
            quantity,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error(
            "<!> Error updating medicine quantity in pharmacy:",
            error
        );
        res.status(400).send(error);
    }

    console.log("\n");
});


export default router;
