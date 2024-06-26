import express from "express";
import User from "../models/user-model"; // Importando o modelo User de ../models/
import { createTask } from "../utils/tasks";
import { kafkaLog } from "../kafka";

const router = express.Router();

// POST /user - Criação de um novo usuário
router.post("/user", async (req, res) => {
    console.log("# [POST] /user");

    try {
        console.log("<&> Dados recebidos:", req.body);

        const { CNS, name, birthdate, email, phone, password, sex } = req.body;

        const user = new User({
            CNS,
            name,
            birthdate,
            email,
            phone,
            password,
            sex,
        });

        // await user.save();
        const taskData = await createTask("create/user", user);

        res.status(201).send(taskData);
    } catch (error) {
        console.error("<!> Erro ao criar usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /user/:CNS - Obter informações de um usuário específico
router.get("/user/:CNS", async (req, res) => {
    console.log("# [GET] /user/:CNS");

    try {
        const CNS = req.params.CNS;

        const user = await User.findOne({ CNS }).exec();

        if (!user) {
            console.error("<!> Usuário não encontrado com CNS:", CNS);
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        console.log("<$> Usuário encontrado:", user);
        res.status(200).send(user);
    } catch (error) {
        console.error("<!> Erro ao obter usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// PUT /user/:id - Atualizar informações de um usuário específico
router.put("/user/:CNS", async (req, res) => {
    console.log("# [PUT] /user/:CNS");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const CNS = req.params.CNS;
        const { name, birthdate, email, phone, password, sex } = req.body;

        // checking if user exists
        const userExists = await User.findOne({ CNS }).exec();

        if (!userExists) {
            kafkaLog(
                "update/user",
                {
                    error: "Can't update user because it doesn't exist.",
                    data: {
                        CNS,
                        name,
                        birthdate,
                        email,
                        phone,
                        password,
                    },
                },
                `Error: Can't update user because it doesn't exist.`
            );
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        const taskData = await createTask("update/user", {
            CNS,
            name,
            birthdate,
            email,
            phone,
            password,
        });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Erro ao atualizar usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /user/:id - Deletar um usuário específico
router.delete("/user/:CNS", async (req, res) => {
    console.log("# [DELETE] /user/:CNS");

    try {
        const CNS = req.params.CNS;

        const userExists = await User.findOne({ CNS }).exec();
        
        if (!userExists) {
            kafkaLog(
                "delete/user",
                {
                    error: "Can't delete user because it doesn't exist.",
                    data: { CNS },
                },
                `Error: Can't delete user because it doesn't exist.`
            );
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        const taskData = await createTask("delete/user", { CNS });

        res.status(200).send(taskData);
    } catch (error) {
        console.error("<!> Erro ao deletar usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
