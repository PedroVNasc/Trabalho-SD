// consumer/src/tasks/clinic-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import Clinic from "../models/clinic-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createClinic = async (task: ITask) => {
    const clinic = new Clinic(task.data);
    await clinic.save().catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });
    conlog(`Clinic created in MongoDB:`, clinic);

    await kafkaLog("create/clinic", clinic);
};

export const updateClinic = async (task: ITask) => {
    const { id, region, users } = task.data;

    let error = null;

    const clinic = await Clinic.findOneAndUpdate(
        { id },
        {
            region,
            users,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!clinic) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/clinic", clinic);
};

export const deleteClinic = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const clinic = await Clinic.findOneAndDelete({ id }).catch((err: any) => {
        error = err;
    });

    if (!clinic) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/clinic", clinic);
};
