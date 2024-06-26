// consumer/src/tasks/pharmacy-tasks.ts
import { kafkaLog } from "../kafka";
import { ITask } from "../models/task-model";
import Pharmacy from "../models/pharmacy-model";
import { markAsFailed } from "../utils/tasks";
import { conlog } from "../utils/utils";

export const createPharmacy = async (task: ITask) => {
    const pharmacy = new Pharmacy(task.data);
    await pharmacy.save().catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });
    conlog(`Pharmacy created in MongoDB:`, pharmacy);

    await kafkaLog("create/pharmacy", pharmacy);
};

export const updatePharmacy = async (task: ITask) => {
    const { id, region, name, address, medicines } = task.data;

    let error = null;

    const pharmacy = await Pharmacy.findOneAndUpdate(
        { id },
        {
            region,
            name,
            address,
            medicines,
        },
        { new: true, runValidators: true }
    ).catch((err: any) => {
        error = err;
    });

    if (!pharmacy) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("update/pharmacy", pharmacy);
};

export const deletePharmacy = async (task: ITask) => {
    const { id } = task.data;

    let error = null;

    const pharmacy = await Pharmacy.findOneAndDelete({ id }).catch(
        (err: any) => {
            error = err;
        }
    );

    if (!pharmacy) {
        error = new Error("Not found!");
    }

    if (error) {
        await markAsFailed(task, error);
        return;
    }

    await kafkaLog("delete/pharmacy", pharmacy);
};

export const addMedicine = async (task: ITask) => {
    const { pharmacyId, medicine } = task.data;

    const pharmacy = await Pharmacy.findOneAndUpdate(
        { id: pharmacyId },
        { $push: { medicines: medicine } },
        { new: true }
    ).catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });

    if (!pharmacy) {
        await markAsFailed(task, new Error("Pharmacy not found!"));
        return;
    }

    conlog(`Medicine added to pharmacy in MongoDB:`, pharmacy);

    await kafkaLog("add/medicine", { pharmacyId, medicine });
};

export const updateMedicine = async (task: ITask) => {
    const { pharmacyId, medicineId, updatedMedicine } = task.data;

    const pharmacy = await Pharmacy.findOneAndUpdate(
        { id: pharmacyId, "medicines.id": medicineId },
        { $set: { "medicines.$": updatedMedicine } },
        { new: true }
    ).catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });

    if (!pharmacy) {
        await markAsFailed(task, new Error("Pharmacy or medicine not found!"));
        return;
    }

    conlog(`Medicine updated in pharmacy in MongoDB:`, pharmacy);

    await kafkaLog("update/medicine", {
        pharmacyId,
        medicineId,
        updatedMedicine,
    });
};

export const deleteMedicine = async (task: ITask) => {
    const { pharmacyId, medicineId } = task.data;

    const pharmacy = await Pharmacy.findOneAndUpdate(
        { id: pharmacyId },
        { $pull: { medicines: { id: medicineId } } },
        { new: true }
    ).catch(async (err: any) => {
        const updatedTask = await markAsFailed(task);
        return;
    });

    if (!pharmacy) {
        await markAsFailed(task, new Error("Pharmacy or medicine not found!"));
        return;
    }

    conlog(`Medicine deleted from pharmacy in MongoDB:`, pharmacy);

    await kafkaLog("delete/medicine", { pharmacyId, medicineId });
};



export const updateMedicineQuantity = async (task: ITask) => {
    const { pharmacyId, medicineId, quantity } = task.data;

    const pharmacy = await Pharmacy.findOneAndUpdate(
        { id: pharmacyId, "medicines.id": medicineId },
        { $set: { "medicines.$.quantity": quantity } },
        { new: true }
    ).catch(async (err: any) => {
        await markAsFailed(task, err);
        return;
    });

    if (!pharmacy) {
        await markAsFailed(task, new Error("Pharmacy or medicine not found!"));
        return;
    }

    conlog(`Medicine quantity updated in pharmacy in MongoDB:`, pharmacy);

    await kafkaLog("update/medicineQuantity", { pharmacyId, medicineId, quantity });
};
