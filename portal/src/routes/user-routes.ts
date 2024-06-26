import express from "express";
import User from "../models/user-module"; // Importando o modelo User de ../models/
import { producer, sendMessageToKafka } from "../kafka"; // Importando o producer Kafka
import { v4 as uuidv4 } from "uuid";

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
        await sendMessageToKafka("user-created", user);

        console.log("<$> Usuário criado [no kafka]:", user);

        res.status(201).send(user);
    } catch (error) {
        console.error("<!> Erro ao criar usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// GET /user/:id - Obter informações de um usuário específico
router.get("/user/:id", async (req, res) => {
    console.log("# [GET] /user/:id");

    try {
        const user = await User.findById(req.params.id).exec();

        if (!user) {
            console.error("<!> Usuário não encontrado com id:", req.params.id);
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
router.put("/user/:id", async (req, res) => {
    console.log("# [PUT] /user/:id");

    try {
        console.log("<&> Dados recebidos para atualização:", req.body);

        const { CNS, name, birthdate, email, phone, password, sex } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                CNS,
                name,
                birthdate,
                email,
                phone,
                password,
                sex,
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            console.error("<!> Usuário não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        await sendMessageToKafka("user_updated", user);

        console.log("<$> Usuário atualizado:", user);
        res.status(200).send(user);
    } catch (error) {
        console.error("<!> Erro ao atualizar usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

// DELETE /user/:id - Deletar um usuário específico
router.delete("/user/:id", async (req, res) => {
    console.log("# [DELETE] /user/:id");

    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            console.error("<!> Usuário não encontrado com id:", req.params.id);
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        await sendMessageToKafka("user_deleted", user);

        console.log("<$> Usuário deletado:", user);
        res.status(200).send(user);
    } catch (error) {
        console.error("<!> Erro ao deletar usuário:", error);
        res.status(400).send(error);
    }

    console.log("\n");
});

export default router;
