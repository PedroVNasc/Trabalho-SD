// consumer/src/tasks/doctor-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import Doctor from "../models/doctor-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createDoctor = async (task: ITask) => {
    const doctor = new Doctor(task.data);
    await doctor.save().catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });
    conlog(`Doctor created in MongoDB:`, doctor);

    await kafkaLog("create/doctor", doctor);
};

export const updateDoctor = async (task: ITask) => {
    const {
        id,
        name,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        specialty,
        licenseNumber,
        clinic,
    } = task.data;

    let error = null;

    const doctor = await Doctor.findOneAndUpdate(
        { id },
        {
            name,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            specialty,
            licenseNumber,
            clinic,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!doctor) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/doctor", doctor);
};

export const deleteDoctor = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const doctor = await Doctor.findOneAndDelete({ id }).catch((err: any) => {
        error = err;
    });

    if (!doctor) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/doctor", doctor);
};
