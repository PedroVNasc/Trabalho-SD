// Importing express
import { Router } from "express";

// Importing the schema
import User from "../models/User";

// Creating a new router
const router = Router();

// POST /register
router.post("/register", async (req, res) => {
    console.log("# [POST] /register");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const { name, email, password } = req.body;

        // Creating a new user and then saving it to the database
        const user = new User({ name, email, password });
        await user.save();

        // Tell the operator about the success
        console.log("<$> User created:", user);

        // Tell the client about the success
        res.status(201).send(user);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating user:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /users
router.get("/users", async (req, res) => {
    console.log("# [GET] /users");

    try {
        // Retrieving all users from the database
        const users = await User.find();

        // Tell the operator about the success
        console.log("<$> Users retrieved:", users);

        // Tell the client about the success
        res.status(200).send(users);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving users:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
