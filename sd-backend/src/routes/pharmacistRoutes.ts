import express from "express";
import mongoose from "mongoose";
import Pharmacist from "../models/Pharmacist"; // Importando o modelo Pharmacist de ../models/

const router = express.Router();

// POST /pharmacist - Criação de um novo farmacêutico
router.post("/pharmacist", async (req, res) => {
    console.log("# [POST] /pharmacist");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const {
            id,
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        } = req.body;

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

        await pharmacist.save();

        console.log("<$> Farmacêutico criado:", pharmacist);

        res.status(201).send(pharmacist);
    } catch (error) {
        console.error("<!> Erro ao criar farmacêutico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /pharmacist/:id - Obter informações de um farmacêutico específico
router.get("/pharmacist/:id", async (req, res) => {
    console.log("# [GET] /pharmacist/:id");

    try {
        const pharmacist = await Pharmacist.findById(req.params.id)
            .populate("pharmacyId")
            .exec();

        if (!pharmacist) {
            console.error(
                "<!> Farmacêutico não encontrado com id:",
                req.params.id
            );
            return res
                .status(404)
                .send({ error: "Farmacêutico não encontrado" });
        }

        console.log("<$> Farmacêutico encontrado:", pharmacist);
        res.status(200).send(pharmacist);
    } catch (error) {
        console.error("<!> Erro ao obter farmacêutico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /pharmacist/:id - Atualizar informações de um farmacêutico específico
router.put("/pharmacist/:id", async (req, res) => {
    console.log("# [PUT] /pharmacist/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const {
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        } = req.body;

        const pharmacist = await Pharmacist.findByIdAndUpdate(
            req.params.id,
            {
                region,
                name,
                address,
                phone,
                email,
                licenseNumber,
                pharmacyId,
            },
            { new: true, runValidators: true }
        );

        if (!pharmacist) {
            console.error(
                "<!> Farmacêutico não encontrado com id:",
                req.params.id
            );
            return res
                .status(404)
                .send({ error: "Farmacêutico não encontrado" });
        }

        console.log("<$> Farmacêutico atualizado:", pharmacist);
        res.status(200).send(pharmacist);
    } catch (error) {
        console.error("<!> Erro ao atualizar farmacêutico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /pharmacist/:id - Deletar um farmacêutico específico
router.delete("/pharmacist/:id", async (req, res) => {
    console.log("# [DELETE] /pharmacist/:id");

    try {
        const pharmacist = await Pharmacist.findByIdAndDelete(req.params.id);

        if (!pharmacist) {
            console.error(
                "<!> Farmacêutico não encontrado com id:",
                req.params.id
            );
            return res
                .status(404)
                .send({ error: "Farmacêutico não encontrado" });
        }

        console.log("<$> Farmacêutico deletado:", pharmacist);
        res.status(200).send(pharmacist);
    } catch (error) {
        console.error("<!> Erro ao deletar farmacêutico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
