import { Router } from "express";
import PrescriptionRequest from "../models/PrescriptionRequest";

const router = Router();

// POST /prescription-request
router.post("/prescription-request", async (req, res) => {
    console.log("# [POST] /prescription-request");

    try {
        // What is happening?
        console.log("<&> data received:", req.body);

        // Extracting useful information from the request body
        const {
            prescription,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        } = req.body;

        // Creating a new prescription request and then saving it to the database
        const prescriptionRequest = new PrescriptionRequest({
            prescription,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        });
        await prescriptionRequest.save();

        // Tell the operator about the success
        console.log("<$> PrescriptionRequest created:", prescriptionRequest);

        // Tell the client about the success
        res.status(201).send(prescriptionRequest);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error creating prescription request:", error);

        // Tell the client about the error
        res.status(400).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

// GET /prescription-requests
router.get("/prescription-requests", async (req, res) => {
    console.log("# [GET] /prescription-requests");

    try {
        // Retrieving all prescription requests from the database
        const prescriptionRequests = await PrescriptionRequest.find();

        // Tell the operator about the success
        console.log(
            "<$> PrescriptionRequests retrieved:",
            prescriptionRequests
        );

        // Tell the client about the success
        res.status(200).send(prescriptionRequests);
    } catch (error) {
        // Tell the operator about the error
        console.error("<!> Error retrieving prescription requests:", error);

        // Tell the client about the error
        res.status(500).send(error);
    }

    console.log("\n"); // Just to make the logs more readable
});

export default router;
