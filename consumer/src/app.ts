import { runConsumer } from "./consumer";
import {consumer, setupConsumer} from "./kafka";

setupConsumer().then(() => {
    console.log("Consumer connected and subscribed to test-topic");
    consumer.run({
        eachMessage: runConsumer,
    });
});