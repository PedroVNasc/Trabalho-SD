// consumer/src/tasks/pharmacist-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import Pharmacist from "../models/pharmacist-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createPharmacist = async (task: ITask) => {
    const pharmacist = new Pharmacist(task.data);
    await pharmacist.save().catch(async (err: any) => {
        await markAsFailed(task, err);
        return;
    });
    conlog(`Pharmacist created in MongoDB:`, pharmacist);

    await kafkaLog("create/pharmacist", pharmacist);
};

export const updatePharmacist = async (task: ITask) => {
    const {
        id,
        region,
        name,
        address,
        phone,
        email,
        licenseNumber,
        pharmacyId,
    } = task.data;

    let error = null;

    const pharmacist = await Pharmacist.findOneAndUpdate(
        { id },
        {
            region,
            name,
            address,
            phone,
            email,
            licenseNumber,
            pharmacyId,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!pharmacist) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/pharmacist", pharmacist);
};

export const deletePharmacist = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const pharmacist = await Pharmacist.findOneAndDelete({ id }).catch(
        (err: any) => {
            error = err;
        }
    );

    if (!pharmacist) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/pharmacist", pharmacist);
};
