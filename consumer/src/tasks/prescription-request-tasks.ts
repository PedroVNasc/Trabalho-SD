// consumer/src/tasks/prescription-request-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import PrescriptionRequest from "../models/prescription-request-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createPrescriptionRequest = async (task: ITask) => {
    const prescriptionRequest = new PrescriptionRequest(task.data);
    await prescriptionRequest.save().catch(async (err: any) => {
        await markAsFailed(task, err);
        return;
    });
    conlog(`Prescription request created in MongoDB:`, prescriptionRequest);

    await kafkaLog("create/prescriptionRequest", prescriptionRequest);
};

export const updatePrescriptionRequest = async (task: ITask) => {
    const { id, prescription, approved, readiness, pharmacist, requestDate, deliveryDate, status } = task.data;

    let error = null;

    const prescriptionRequest = await PrescriptionRequest.findOneAndUpdate(
        { _id: id },
        {
            prescription,
            approved,
            readiness,
            pharmacist,
            requestDate,
            deliveryDate,
            status,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!prescriptionRequest) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/prescriptionRequest", prescriptionRequest);
};

export const deletePrescriptionRequest = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const prescriptionRequest = await PrescriptionRequest.findOneAndDelete({ _id: id }).catch((err: any) => {
        error = err;
    });

    if (!prescriptionRequest) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/prescriptionRequest", prescriptionRequest);
};
