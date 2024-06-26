import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import User from "../models/user-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createUser = async (task: ITask) => {
    const user = new User(task.data);
    await user.save().catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });
    conlog(`Usuário criado no MongoDB:`, user);

    await kafkaLog("create/user", user);
};

export const updateUser = async (task: ITask) => {
    const { CNS, name, birthdate, email, phone, password, sex } = task.data;

    let error = null;

    const user = await User.findOneAndUpdate(
        { CNS },
        {
            name,
            birthdate,
            email,
            phone,
            password,
            sex,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!user) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/user", user);
};


export const deleteUser = async (task: ITask) => {
    const { CNS } = task.data;

    let error = null;

    const user = await User.findOneAndDelete({ CNS }).catch((err: any) => {
        error = err;
    });

    if (!user) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/user", user);
}