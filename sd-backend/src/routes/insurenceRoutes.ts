import express from "express";
import mongoose from "mongoose";
import Insurance from "../models/Insurance"; // Importando o modelo Insurance de ../models/

const router = express.Router();

// POST /insurance - Criação de um novo seguro
router.post("/insurance", async (req, res) => {
    console.log("# [POST] /insurance");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const { region, name } = req.body;

        const insurance = new Insurance({
            region,
            name,
        });

        await insurance.save();

        console.log("<$> Seguro criado:", insurance);

        res.status(201).send(insurance);
    } catch (error) {
        console.error("<!> Erro ao criar seguro:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /insurance/:id - Obter informações de um seguro específico
router.get("/insurance/:id", async (req, res) => {
    console.log("# [GET] /insurance/:id");

    try {
        const insurance = await Insurance.findById(req.params.id).exec();

        if (!insurance) {
            console.error("<!> Seguro não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Seguro não encontrado" });
        }

        console.log("<$> Seguro encontrado:", insurance);
        res.status(200).send(insurance);
    } catch (error) {
        console.error("<!> Erro ao obter seguro:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /insurance/:id - Atualizar informações de um seguro específico
router.put("/insurance/:id", async (req, res) => {
    console.log("# [PUT] /insurance/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const { region, name } = req.body;

        const insurance = await Insurance.findByIdAndUpdate(
            req.params.id,
            {
                region,
                name,
            },
            { new: true, runValidators: true }
        );

        if (!insurance) {
            console.error("<!> Seguro não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Seguro não encontrado" });
        }

        console.log("<$> Seguro atualizado:", insurance);
        res.status(200).send(insurance);
    } catch (error) {
        console.error("<!> Erro ao atualizar seguro:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /insurance/:id - Deletar um seguro específico
router.delete("/insurance/:id", async (req, res) => {
    console.log("# [DELETE] /insurance/:id");

    try {
        const insurance = await Insurance.findByIdAndDelete(req.params.id);

        if (!insurance) {
            console.error("<!> Seguro não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Seguro não encontrado" });
        }

        console.log("<$> Seguro deletado:", insurance);
        res.status(200).send(insurance);
    } catch (error) {
        console.error("<!> Erro ao deletar seguro:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
