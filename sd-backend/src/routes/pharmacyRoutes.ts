import express from "express";
import mongoose from "mongoose";
import Pharmacy from "../models/Pharmacy"; // Importando o modelo Pharmacy de ../models/

const router = express.Router();

// POST /pharmacy - Criação de uma nova farmácia
router.post("/pharmacy", async (req, res) => {
    console.log("# [POST] /pharmacy");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const { region, name, address, medicines } = req.body;

        const pharmacy = new Pharmacy({
            region,
            name,
            address,
            medicines,
        });

        await pharmacy.save();

        console.log("<$> Farmácia criada:", pharmacy);

        res.status(201).send(pharmacy);
    } catch (error) {
        console.error("<!> Erro ao criar farmácia:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /pharmacy/:id - Obter informações de uma farmácia específica
router.get("/pharmacy/:id", async (req, res) => {
    console.log("# [GET] /pharmacy/:id");

    try {
        const pharmacy = await Pharmacy.findById(req.params.id).exec();

        if (!pharmacy) {
            console.error("<!> Farmácia não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Farmácia não encontrada" });
        }

        console.log("<$> Farmácia encontrada:", pharmacy);
        res.status(200).send(pharmacy);
    } catch (error) {
        console.error("<!> Erro ao obter farmácia:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /pharmacy/:id - Atualizar informações de uma farmácia específica
router.put("/pharmacy/:id", async (req, res) => {
    console.log("# [PUT] /pharmacy/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const { region, name, address, medicines } = req.body;

        const pharmacy = await Pharmacy.findByIdAndUpdate(
            req.params.id,
            {
                region,
                name,
                address,
                medicines,
            },
            { new: true, runValidators: true }
        );

        if (!pharmacy) {
            console.error("<!> Farmácia não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Farmácia não encontrada" });
        }

        console.log("<$> Farmácia atualizada:", pharmacy);
        res.status(200).send(pharmacy);
    } catch (error) {
        console.error("<!> Erro ao atualizar farmácia:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /pharmacy/:id - Deletar uma farmácia específica
router.delete("/pharmacy/:id", async (req, res) => {
    console.log("# [DELETE] /pharmacy/:id");

    try {
        const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);

        if (!pharmacy) {
            console.error("<!> Farmácia não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Farmácia não encontrada" });
        }

        console.log("<$> Farmácia deletada:", pharmacy);
        res.status(200).send(pharmacy);
    } catch (error) {
        console.error("<!> Erro ao deletar farmácia:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
