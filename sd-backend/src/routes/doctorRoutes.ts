import express from "express";
import mongoose from "mongoose";
import Doctor from "../models/Doctor"; // Supondo que o modelo Doctor esteja em um arquivo models/Doctor

const router = express.Router();

// POST /doctor - Criação de um novo médico
router.post("/doctor", async (req, res) => {
    console.log("# [POST] /doctor");

    try {
        console.log("<&> Dados recebidos:", req.body);

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

        await doctor.save();

        console.log("<$> Médico criado:", doctor);

        res.status(201).send(doctor);
    } catch (error) {
        console.error("<!> Erro ao criar médico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /doctor/:id - Obter informações de um médico específico
router.get("/doctor/:id", async (req, res) => {
    console.log("# [GET] /doctor/:id");

    try {
        const doctor = await Doctor.findById(req.params.id).populate("clinic").exec();

        if (!doctor) {
            console.error("<!> Médico não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Médico não encontrado" });
        }

        console.log("<$> Médico encontrado:", doctor);
        res.status(200).send(doctor);
    } catch (error) {
        console.error("<!> Erro ao obter médico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /doctor/:id - Atualizar informações de um médico específico
router.put("/doctor/:id", async (req, res) => {
    console.log("# [PUT] /doctor/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

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

        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            {
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
            { new: true, runValidators: true }
        );

        if (!doctor) {
            console.error("<!> Médico não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Médico não encontrado" });
        }

        console.log("<$> Médico atualizado:", doctor);
        res.status(200).send(doctor);
    } catch (error) {
        console.error("<!> Erro ao atualizar médico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /doctor/:id - Deletar um médico específico
router.delete("/doctor/:id", async (req, res) => {
    console.log("# [DELETE] /doctor/:id");

    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctor) {
            console.error("<!> Médico não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Médico não encontrado" });
        }

        console.log("<$> Médico deletado:", doctor);
        res.status(200).send(doctor);
    } catch (error) {
        console.error("<!> Erro ao deletar médico:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
