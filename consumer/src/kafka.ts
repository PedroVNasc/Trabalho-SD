import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
    clientId: "sus-consumer",
    brokers: ["kafka:9092"],
    logLevel: logLevel.INFO,
});

export const consumer = kafka.consumer({ groupId: "sus-group" });

consumer.on(consumer.events.GROUP_JOIN, async (e) => {
    console.log(
        `Consumer group rebalanced. New assignments: ${JSON.stringify(
            e.payload.memberAssignment
        )}`
    );
});

export const setupConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
};
