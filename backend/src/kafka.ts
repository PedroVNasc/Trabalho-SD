// src/kafka.ts
import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "sus-app",
    brokers: ["kafka:9092"],
});

export const kafkAdim = kafka.admin();

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "sus-group" });

export const kafkaSetup = async () => {
    console.log("Setting up Kafka...");
    await kafkAdim.connect();
    console.log("Connected to Kafka!");

    await kafkAdim.createTopics({
        topics: [
            {
                topic: "sus",
                numPartitions: 1,
            },
        ],
    });

    console.log("Kafka setup done!");

    await kafkAdim.disconnect();

    
    console.log("Connecting to producer...");
    await producer.connect();

    console.log("Connecting to consumer...");
    await consumer.connect();
    consumer.subscribe({ topic: 'sus', fromBeginning: true });
    
    console.log("Kafka is ready!");
};