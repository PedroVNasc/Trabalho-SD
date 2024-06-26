// Importing important modules
import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";
import { NAME } from "./config/constants";
import { conlog, errlog } from "./utils/utils";

// Creating a Kafka instance
const kafka = new Kafka({
    clientId: "sus-consumer",
    brokers: ["kafka:9092"],
});

// Creating a Kafka consumer, producer and admin
export const consumer = kafka.consumer({ groupId: "sus-consumer-group" });
export const producer = kafka.producer();
export const kafkAdimin = kafka.admin();

// Connecting to Kafka
export const connect2Kafka = async () => {
    console.log(`[${NAME}] Connecting to Kafka...`);

    await producer.connect();
    console.log(`[${NAME}] Producer connected to Kafka!`);

    await consumer.connect();
    console.log(`[${NAME}] Consumer connected to Kafka!`);
};

// Function to send messages to Kafka
export const sendToKafka = async (topic: string, message: object[]) => {
    await producer.send({
        topic,
        messages: [{ key: uuidv4(), value: JSON.stringify(message) }],
    });
};

export const kafkaLog = async (
    action: string,
    data: any,
    message?: string,
    isErr?: boolean
) => {
    await sendToKafka("sus-log", [
        {
            action,
            message,
            data: JSON.stringify(data),
            timestamp: new Date().toISOString(),
            handler: NAME,
            isErr: isErr ?? false,
        },
    ]);

    const msg = message ? `- ${message}` : "";

    conlog(`Logged${isErr ? "[ERROR]" : ""}: ${action}${msg}`, data);
};
