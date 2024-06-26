import db from "../db";
import Task, { ITask } from "../models/task-model";
import { NAME } from "../config/constants";
import { v4 as uuidv4 } from "uuid";
import { kafkaLog, producer } from "../kafka";
import { conlog, sleep } from "./utils";
import { request } from "http";
import { createUser } from "../tasks/user-tasks";
import { allTasks } from "../tasks/all-tasks";

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
        topic: "tasks",
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
};

export const markAsDone = async (task : ITask) => {
    const thisMoment = new Date();

    // Update task status on the mongo db
    await Task.findOneAndUpdate(
        { id: task.id },
        {
            status: "done",
            responseTime: thisMoment,
            solver: NAME,
        }
    );

    let taskCopy = structuredClone(task);

    taskCopy.status = "done";
    taskCopy.responseTime = thisMoment;
    taskCopy.solver = NAME;

    return taskCopy;
};

export const markAsFailed = async (task : ITask, err?: any) => {
    const thisMoment = new Date();

    // Update task status on the mongo db
    await Task.findOneAndUpdate(
        { id: task.id },
        {
            status: "failed",
            responseTime: thisMoment,
            solver: NAME,
        }
    );

    let taskCopy = structuredClone(task);

    taskCopy.status = "failed";
    taskCopy.responseTime = thisMoment;
    taskCopy.solver = NAME;

    await kafkaLog("failed-task", taskCopy, `Task failed due to an error: Error=(${err})`);

    return taskCopy;
};

export const processTask = async (message: string) => {
    // await sleep(5); // Simulating a processing time

    let temp = null;

    try {
        temp = JSON.parse(message);
    } catch (err) {
        await kafkaLog(
            "process-task",
            err,
            `Error parsing message: Error=(${err}); Message=(${message}).`,
            true
        );
        return;
    }

    const task = temp;
    temp = null;

    if (!task) {
        await kafkaLog(
            "process-task",
            null,
            `Error parsing message: Message=(${message}).`,
            true
        );
        return;
    }

    try {
        const notRecognized = allTasks(task);

        if (notRecognized) {
            throw new Error("Task not recognized!");
        }

        const updatedTask = markAsDone(task); // this

        // conlog(`Task <${task.id}> of type <${task.type}> was processed!`);
        await kafkaLog("process-task", updatedTask, "Task processed successfully!");
    } catch (err) {
        await markAsFailed(task);
        await kafkaLog(
            "process-task",
            err,
            `Error processing task: Error=(${err}); Message=(${message}).`,
            true
        );
    }
};
