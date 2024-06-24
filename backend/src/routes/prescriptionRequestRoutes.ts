import express from "express";
import mongoose from "mongoose";
import PrescriptionRequest from "../models/PrescriptionRequest"; // Importando o modelo PrescriptionRequest de ../models/

const router = express.Router();

// POST /prescription-request - Criação de uma nova solicitação de prescrição
router.post("/prescription-request", async (req, res) => {
    console.log("# [POST] /prescription-request");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const {
            prescription,
            aproved,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        } = req.body;

        const prescriptionRequest = new PrescriptionRequest({
            prescription,
            aproved,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        });

        await prescriptionRequest.save();

        console.log("<$> Solicitação de prescrição criada:", prescriptionRequest);

        res.status(201).send(prescriptionRequest);
    } catch (error) {
        console.error("<!> Erro ao criar solicitação de prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /prescription-request/:id - Obter informações de uma solicitação de prescrição específica
router.get("/prescription-request/:id", async (req, res) => {
    console.log("# [GET] /prescription-request/:id");

    try {
        const prescriptionRequest = await PrescriptionRequest.findById(req.params.id)
            .populate("prescription")
            .exec();

        if (!prescriptionRequest) {
            console.error("<!> Solicitação de prescrição não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Solicitação de prescrição não encontrada" });
        }

        console.log("<$> Solicitação de prescrição encontrada:", prescriptionRequest);
        res.status(200).send(prescriptionRequest);
    } catch (error) {
        console.error("<!> Erro ao obter solicitação de prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /prescription-request/:id - Atualizar informações de uma solicitação de prescrição específica
router.put("/prescription-request/:id", async (req, res) => {
    console.log("# [PUT] /prescription-request/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const {
            prescription,
            aproved,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        } = req.body;

        const prescriptionRequest = await PrescriptionRequest.findByIdAndUpdate(
            req.params.id,
            {
                prescription,
                aproved,
                readiness,
                pharmacist,
                requestDate,
                deliveryDate,
                status,
            },
            { new: true, runValidators: true }
        );

        if (!prescriptionRequest) {
            console.error("<!> Solicitação de prescrição não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Solicitação de prescrição não encontrada" });
        }

        console.log("<$> Solicitação de prescrição atualizada:", prescriptionRequest);
        res.status(200).send(prescriptionRequest);
    } catch (error) {
        console.error("<!> Erro ao atualizar solicitação de prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /prescription-request/:id - Deletar uma solicitação de prescrição específica
router.delete("/prescription-request/:id", async (req, res) => {
    console.log("# [DELETE] /prescription-request/:id");

    try {
        const prescriptionRequest = await PrescriptionRequest.findByIdAndDelete(req.params.id);

        if (!prescriptionRequest) {
            console.error("<!> Solicitação de prescrição não encontrada com id:", req.params.id);
            return res.status(404).send({ error: "Solicitação de prescrição não encontrada" });
        }

        console.log("<$> Solicitação de prescrição deletada:", prescriptionRequest);
        res.status(200).send(prescriptionRequest);
    } catch (error) {
        console.error("<!> Erro ao deletar solicitação de prescrição:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
