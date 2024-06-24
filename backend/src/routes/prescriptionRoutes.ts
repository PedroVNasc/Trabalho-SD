import express from "express";
import mongoose from "mongoose";
import Prescription from "../models/Prescription"; // Importando o modelo Prescription de ../models/

const router = express.Router();

// POST /prescription - Criação de uma nova prescrição
router.post("/prescription", async (req, res) => {
    console.log("# [POST] /prescription");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const { id, medicine, patient, doctor } = req.body;

        const prescription = new Prescription({
            id,
            medicine,
            patient,
            doctor,
        });

        await prescription.save();

        console.log("<$> Prescrição criada:", prescription);

        res.status(201).send(prescription);
    } catch (error) {
        console.error("<!> Erro ao criar prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /prescription/:id - Obter informações de uma prescrição específica
router.get("/prescription/:id", async (req, res) => {
    console.log("# [GET] /prescription/:id");

    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate("medicine")
            .populate("patient")
            .populate("doctor")
            .exec();

        if (!prescription) {
            console.error("<!> Prescrição não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Prescrição não encontrada" });
        }

        console.log("<$> Prescrição encontrada:", prescription);
        res.status(200).send(prescription);
    } catch (error) {
        console.error("<!> Erro ao obter prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /prescription/:id - Atualizar informações de uma prescrição específica
router.put("/prescription/:id", async (req, res) => {
    console.log("# [PUT] /prescription/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const { medicine, patient, doctor } = req.body;

        const prescription = await Prescription.findByIdAndUpdate(
            req.params.id,
            {
                medicine,
                patient,
                doctor,
            },
            { new: true, runValidators: true }
        );

        if (!prescription) {
            console.error("<!> Prescrição não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Prescrição não encontrada" });
        }

        console.log("<$> Prescrição atualizada:", prescription);
        res.status(200).send(prescription);
    } catch (error) {
        console.error("<!> Erro ao atualizar prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /prescription/:id - Deletar uma prescrição específica
router.delete("/prescription/:id", async (req, res) => {
    console.log("# [DELETE] /prescription/:id");

    try {
        const prescription = await Prescription.findByIdAndDelete(req.params.id);

        if (!prescription) {
            console.error("<!> Prescrição não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Prescrição não encontrada" });
        }

        console.log("<$> Prescrição deletada:", prescription);
        res.status(200).send(prescription);
    } catch (error) {
        console.error("<!> Erro ao deletar prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
