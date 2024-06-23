// src/kafka.ts
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "my-group" });

export const runKafka = async () => {
    await producer.connect();
    await consumer.connect();
};
