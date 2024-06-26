import db from "../db";
import Task from "../models/task-model";
import { NAME } from "../config/constants";
import { v4 as uuidv4 } from "uuid";
import { kafkaLog, producer } from "../kafka";
import { conlog } from "./utils";
import { request } from "http";


export const createTask = async (type: string, data: any) => {
    const task = new Task({
        id: uuidv4(),
        type,
        data,
        requestTime: new Date(),
        status: "pending",
        caller: NAME,
    });

    conlog(`Creating task <${task.id}>:`, task);

    await task.save();

    conlog(`Task <${task.id}> created on db!`);

    await producer.send({
        topic: "sus-tasks",
        messages: [
            {
                key: task.id,
                value: JSON.stringify(task),
            },
        ],
    });

    conlog(`Task <${task.id}> sent to kafka!`);

    await kafkaLog("create-task", task);

    return {
        id: task.id, 
        status: task.status, 
        requestTime: task.requestTime, 
        type: task.type,
        message: "Task registered successfully!",
    };
}