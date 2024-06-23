import { Router } from "express";
import Stock from "../models/Stock";

const router = Router();

// POST /stock
router.post("/stock", async (req, res) => {
    console.log("# [POST] /stock");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const { region, medicine, quantity } = req.body;

        // Creating a new stock and then saving it to the database
        const stock = new Stock({ region, medicine, quantity });
        await stock.save();

        // Tell the operator about the success
        console.log("<$> Stock created:", stock);

        // Tell the client about the success
        res.status(201).send(stock);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating stock:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /stocks
router.get("/stocks", async (req, res) => {
    console.log("# [GET] /stocks");

    try {
        // Retrieving all stocks from the database
        const stocks = await Stock.find();

        // Tell the operator about the success
        console.log("<$> Stocks retrieved:", stocks);

        // Tell the client about the success
        res.status(200).send(stocks);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving stocks:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
