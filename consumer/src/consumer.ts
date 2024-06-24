import { EachMessageHandler } from "kafkajs";

// Shorthand for EachMessageHandler
type EMH = EachMessageHandler;

// This function will be called for each message received by the consumer
export const runConsumer: EMH = async ({
    topic,
    partition,
    message,
}) => {
    console.log("Incoming message: ", {
        topic: topic.toString(),
        partition: partition.toString(),
        key: message.key?.toString(),
        value: message.value?.toString(),
    });

    switch (topic) {
        case "test":
            console.log("Message received on test topic");
            break;
        default:
            console.log("Message received on unknown topic");
            break;
    }
};
