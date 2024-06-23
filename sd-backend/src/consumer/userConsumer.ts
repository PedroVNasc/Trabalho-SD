// src/consumer/userConsumer.ts
import { consumer } from '../kafka';
import User from '../models/User';

const processUserCreated = async (message: any) => {
    const userData = JSON.parse(message.value.toString());
    const user = new User(userData);
    await user.save();
};

const processUserUpdated = async (message: any) => {
    const userData = JSON.parse(message.value.toString());
    await User.findByIdAndUpdate(userData._id, userData, { new: true, runValidators: true });
};

const processUserDeleted = async (message: any) => {
    const userData = JSON.parse(message.value.toString());
    await User.findByIdAndDelete(userData._id);
};

export const runUserConsumer = async () => {
    await consumer.subscribe({ topic: 'user_created', fromBeginning: true });
    await consumer.subscribe({ topic: 'user_updated', fromBeginning: true });
    await consumer.subscribe({ topic: 'user_deleted', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            switch (topic) {
                case 'user_created':
                    await processUserCreated(message);
                    break;
                case 'user_updated':
                    await processUserUpdated(message);
                    break;
                case 'user_deleted':
                    await processUserDeleted(message);
                    break;
            }
        },
    });
};
