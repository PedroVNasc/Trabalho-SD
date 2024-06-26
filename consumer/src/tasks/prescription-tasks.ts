// consumer/src/tasks/prescription-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import Prescription from "../models/prescription-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createPrescription = async (task: ITask) => {
    const prescription = new Prescription(task.data);
    await prescription.save().catch(async (err: any) => {
        await markAsFailed(task, err);
        return;
    });
    conlog(`Prescription created in MongoDB:`, prescription);

    await kafkaLog("create/prescription", prescription);
};

export const updatePrescription = async (task: ITask) => {
    const { id, medicine, patient, doctor } = task.data;

    let error = null;

    const prescription = await Prescription.findOneAndUpdate(
        { id },
        {
            medicine,
            patient,
            doctor,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!prescription) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/prescription", prescription);
};

export const deletePrescription = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const prescription = await Prescription.findOneAndDelete({ id }).catch((err: any) => {
        error = err;
    });

    if (!prescription) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/prescription", prescription);
};
