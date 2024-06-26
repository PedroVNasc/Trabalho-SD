// Importing important modules
import db from "./db";
import { connect2Kafka, consumer } from "./kafka";
import User from "./models/user-model";
import { processTask } from "./utils/tasks";
import { conlog, sleep } from "./utils/utils";

// Hello, World!
console.log(`[CONSUMER:0] Hello World!`);

// Start consumer function
const startConsumer = async () => {
    // Waiting for the Kafka server to be ready
    await sleep(5);

    // Connecting to MongoDB
    await db;

    // Connecting to Kafka
    await connect2Kafka();

    // Subscribing to important topics
    // consumer.subscribe({ topic: "user-created" });
    consumer.subscribe({ topic: "sus-tasks" });

    // Consuming messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const strMessage = message.value?.toString() ?? "";

            // Logging the message
            conlog(`Received message from topic <${topic}>:`, strMessage);

            // Handling the message
            switch (topic) {
                case "sus-tasks": // create the user in MongoDB
                    processTask(strMessage);
                    break;

                default: // ops, unknown topic
                    conlog(`<!> Tópico não reconhecido: ${topic}`);
                    break;
            }
        },
    });

    // set a hello world every 10s
    setInterval(() => {
        conlog("Still standing!")
    }, 10 * 1000);
};

// Invoking the start consumer function
startConsumer();
