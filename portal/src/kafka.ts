import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "sus-consumer",
    brokers: ["kafka:9092"],
});

export const consumer = kafka.consumer({ groupId: "sus-consumer-group" });
export const producer = kafka.producer();
export const kafkAdimin = kafka.admin();

const HOSTNAME = process.env.HOSTNAME;

export const connect2Kafka = async () => {
    console.log(`[${HOSTNAME}] Connecting to Kafka...`);

    await producer.connect();
    console.log(`[${HOSTNAME}] Producer connected to Kafka!`);
    
    await consumer.connect();
    console.log(`[${HOSTNAME}] Consumer connected to Kafka!`);
};