// src/kafka.ts
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["kafka:9092"],
});

const kafkAdim = kafka.admin();



export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "my-group" });

export const runKafka = async () => {
    await kafkAdim.connect();

    await kafkAdim.createTopics({
        topics: [
            {
                topic: "sus",
                numPartitions: 1,
            },
        ],
    });

    await kafkAdim.disconnect();

    await producer.connect();
    await consumer.connect();

    await producer.send({
        topic: "sus",
        messages: [{ value: "Hello KafkaJS user!" }],
    });

    await consumer.subscribe({ topic: "sus", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value?.toString(),
            });
        },
    });
};
