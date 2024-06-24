// src/consumer/prescriptionConsumer.ts
import { consumer } from "../kafka";
import Prescription from "../models/Prescription";

const processMessage = async ({ topic, partition, message }) => {
    const prescriptionData = JSON.parse(message.value.toString());
    const newPrescription = new Prescription(prescriptionData);
    await newPrescription.save();
};

export const runConsumer = async () => {
    await consumer.subscribe({ topic: "prescriptions", fromBeginning: true });

    await consumer.run({
        eachMessage: async (payload) => {
            await processMessage(payload);
        },
    });
};
