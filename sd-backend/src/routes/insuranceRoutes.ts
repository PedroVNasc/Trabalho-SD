import { Router } from "express";
import Insurance from "../models/Insurance";

const router = Router();

// POST /insurance
router.post("/insurance", async (req, res) => {
    console.log("# [POST] /insurance");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const { region } = req.body;

        // Creating a new insurance and then saving it to the database
        const insurance = new Insurance({ region });
        await insurance.save();

        // Tell the operator about the success
        console.log("<$> Insurance created:", insurance);

        // Tell the client about the success
        res.status(201).send(insurance);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating insurance:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /insurances
router.get("/insurances", async (req, res) => {
    console.log("# [GET] /insurances");

    try {
        // Retrieving all insurances from the database
        const insurances = await Insurance.find();

        // Tell the operator about the success
        console.log("<$> Insurances retrieved:", insurances);

        // Tell the client about the success
        res.status(200).send(insurances);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving insurances:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
