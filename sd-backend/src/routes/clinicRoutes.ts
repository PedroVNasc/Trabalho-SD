import express from "express";
import mongoose from "mongoose";
import Clinic from "../models/Clinic"; // Supondo que o modelo Clinic esteja em um arquivo models/Clinic

const router = express.Router();

// POST /clinic - Criação de uma nova clínica
router.post("/clinic", async (req, res) => {
    console.log("# [POST] /clinic");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const { id, region, users } = req.body;

        const clinic = new Clinic({ id, region, users });
        await clinic.save();

        console.log("<$> Clínica criada:", clinic);

        res.status(201).send(clinic);
    } catch (error) {
        console.error("<!> Erro ao criar clínica:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /clinic/:id - Obter informações de uma clínica específica
router.get("/clinic/:id", async (req, res) => {
    console.log("# [GET] /clinic/:id");

    try {
        const clinic = await Clinic.findById(req.params.id).populate("users").exec();

        if (!clinic) {
            console.error("<!> Clínica não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Clínica não encontrada" });
        }

        console.log("<$> Clínica encontrada:", clinic);
        res.status(200).send(clinic);
    } catch (error) {
        console.error("<!> Erro ao obter clínica:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /clinic/:id - Atualizar informações de uma clínica específica
router.put("/clinic/:id", async (req, res) => {
    console.log("# [PUT] /clinic/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const { region, users } = req.body;

        const clinic = await Clinic.findByIdAndUpdate(
            req.params.id,
            { region, users },
            { new: true, runValidators: true }
        );

        if (!clinic) {
            console.error("<!> Clínica não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Clínica não encontrada" });
        }

        console.log("<$> Clínica atualizada:", clinic);
        res.status(200).send(clinic);
    } catch (error) {
        console.error("<!> Erro ao atualizar clínica:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /clinic/:id - Deletar uma clínica específica
router.delete("/clinic/:id", async (req, res) => {
    console.log("# [DELETE] /clinic/:id");

    try {
        const clinic = await Clinic.findByIdAndDelete(req.params.id);

        if (!clinic) {
            console.error("<!> Clínica não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Clínica não encontrada" });
        }

        console.log("<$> Clínica deletada:", clinic);
        res.status(200).send(clinic);
    } catch (error) {
        console.error("<!> Erro ao deletar clínica:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
