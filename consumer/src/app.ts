// Importing important modules
import db from "./db";
import { connect2Kafka, consumer } from "./kafka";
import User from "./models/user-module";

// Hello, World!
console.log(`[CONSUMER:0] Hello World!`);

// Sleep function
function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start consumer function
const startConsumer = async () => {
    // Waiting for the Kafka server to be ready
    await sleep(5000);

    // Connecting to MongoDB
    await db;

    // Connecting to Kafka
    await connect2Kafka();

    // Subscribing to important topics
    consumer.subscribe({ topic: "user-created" });

    // Consuming messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // Logging the message
            console.log({
                value: message.value?.toString(),
            });

            // Handling the message
            switch (topic) {
                case "user-created": // create the user in MongoDB
                    // Parse the data
                    const userData = JSON.parse(message.value?.toString() || "{}");
                    
                    // Save the data
                    const user = new User(userData);
                    await user.save();

                    // Logging the user
                    console.log("<$> Usuário criado [no MongoDB]:", user);
                    break;
                    
                default: // ops, unknown topic
                    console.error(`<!> Tópico não reconhecido: ${topic}`);
                    break;
            }
        },
    });
};

// Invoking the start consumer function
startConsumer();