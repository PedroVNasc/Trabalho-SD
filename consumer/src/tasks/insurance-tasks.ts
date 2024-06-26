// consumer/src/tasks/insurance-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import Insurance from "../models/insurance-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createInsurance = async (task: ITask) => {
    const insurance = new Insurance(task.data);
    await insurance.save().catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });
    conlog(`Insurance record created in MongoDB:`, insurance);

    await kafkaLog("create/insurance", insurance);
};

export const updateInsurance = async (task: ITask) => {
    const { id, region, name } = task.data;

    let error = null;

    const insurance = await Insurance.findByIdAndUpdate(
        id,
        {
            region,
            name,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!insurance) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/insurance", insurance);
};

export const deleteInsurance = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const insurance = await Insurance.findByIdAndDelete(id).catch(
        (err: any) => {
            error = err;
        }
    );

    if (!insurance) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/insurance", insurance);
};
