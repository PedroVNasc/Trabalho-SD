import express from "express";
import mongoose from "mongoose";
import Medicine from "../models/Medicine"; // Importando o modelo Medicine de ../models/

const router = express.Router();

// POST /medicine - Criação de um novo medicamento
router.post("/medicine", async (req, res) => {
    console.log("# [POST] /medicine");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const {
            name,
            genericName,
            brandName,
            dosageForm,
            strength,
            manufacturer,
            expiryDate,
            batchNumber,
            indications,
            contraindications,
            sideEffects,
            storageConditions,
            price,
            prescriptionRequired,
            quantity,
        } = req.body;

        const medicine = new Medicine({
            name,
            genericName,
            brandName,
            dosageForm,
            strength,
            manufacturer,
            expiryDate,
            batchNumber,
            indications,
            contraindications,
            sideEffects,
            storageConditions,
            price,
            prescriptionRequired,
            quantity,
        });

        await medicine.save();

        console.log("<$> Medicamento criado:", medicine);

        res.status(201).send(medicine);
    } catch (error) {
        console.error("<!> Erro ao criar medicamento:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /medicine/:id - Obter informações de um medicamento específico
router.get("/medicine/:id", async (req, res) => {
    console.log("# [GET] /medicine/:id");

    try {
        const medicine = await Medicine.findById(req.params.id).exec();

        if (!medicine) {
            console.error(
                "<!> Medicamento não encontrado com id:",
                req.params.id
            );
            return res
                .status(404)
                .send({ error: "Medicamento não encontrado" });
        }

        console.log("<$> Medicamento encontrado:", medicine);
        res.status(200).send(medicine);
    } catch (error) {
        console.error("<!> Erro ao obter medicamento:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /medicine/:id - Atualizar informações de um medicamento específico
router.put("/medicine/:id", async (req, res) => {
    console.log("# [PUT] /medicine/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const {
            name,
            genericName,
            brandName,
            dosageForm,
            strength,
            manufacturer,
            expiryDate,
            batchNumber,
            indications,
            contraindications,
            sideEffects,
            storageConditions,
            price,
            prescriptionRequired,
            quantity,
        } = req.body;

        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            {
                name,
                genericName,
                brandName,
                dosageForm,
                strength,
                manufacturer,
                expiryDate,
                batchNumber,
                indications,
                contraindications,
                sideEffects,
                storageConditions,
                price,
                prescriptionRequired,
                quantity,
            },
            { new: true, runValidators: true }
        );

        if (!medicine) {
            console.error(
                "<!> Medicamento não encontrado com id:",
                req.params.id
            );
            return res
                .status(404)
                .send({ error: "Medicamento não encontrado" });
        }

        console.log("<$> Medicamento atualizado:", medicine);
        res.status(200).send(medicine);
    } catch (error) {
        console.error("<!> Erro ao atualizar medicamento:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /medicine/:id - Deletar um medicamento específico
router.delete("/medicine/:id", async (req, res) => {
    console.log("# [DELETE] /medicine/:id");

    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            console.error(
                "<!> Medicamento não encontrado com id:",
                req.params.id
            );
            return res
                .status(404)
                .send({ error: "Medicamento não encontrado" });
        }

        console.log("<$> Medicamento deletado:", medicine);
        res.status(200).send(medicine);
    } catch (error) {
        console.error("<!> Erro ao deletar medicamento:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
