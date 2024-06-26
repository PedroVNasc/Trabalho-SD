// consumer/src/tasks/all-tasks.ts
import { ITask } from "../models/task-model";
import { conlog } from "../utils/utils";

// importing functions to process the tasks
import { createUser, deleteUser, updateUser } from "./user-tasks";
import { createClinic, deleteClinic, updateClinic } from "./clinic-tasks";
import { createDoctor, deleteDoctor, updateDoctor } from "./doctor-tasks";
import {
    createInsurance,
    deleteInsurance,
    updateInsurance,
} from "./insurance-tasks";
import {
    createPharmacy,
    deletePharmacy,
    updatePharmacy,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    updateMedicineQuantity,
} from "./pharmacy-tasks";
import {
    createPharmacist,
    deletePharmacist,
    updatePharmacist,
} from "./pharmacist-tasks";
import {
    createPrescription,
    deletePrescription,
    updatePrescription,
} from "./prescription-tasks";
import {
    createPrescriptionRequest,
    deletePrescriptionRequest,
    updatePrescriptionRequest,
} from "./prescription-request-tasks";

// Function to process all tasks
export const allTasks = (task: ITask) => {
    switch (task.type) {
        case "create/user":
            createUser(task);
            break;
        case "update/user":
            updateUser(task);
            break;
        case "delete/user":
            deleteUser(task);
            break;
        case "create/clinic":
            createClinic(task);
            break;
        case "update/clinic":
            updateClinic(task);
            break;
        case "delete/clinic":
            deleteClinic(task);
            break;
        case "create/doctor":
            createDoctor(task);
            break;
        case "update/doctor":
            updateDoctor(task);
            break;
        case "delete/doctor":
            deleteDoctor(task);
            break;
        case "create/insurance":
            createInsurance(task);
            break;
        case "update/insurance":
            updateInsurance(task);
            break;
        case "delete/insurance":
            deleteInsurance(task);
            break;
        case "create/pharmacy":
            createPharmacy(task);
            break;
        case "update/pharmacy":
            updatePharmacy(task);
            break;
        case "delete/pharmacy":
            deletePharmacy(task);
            break;
        case "add/medicine":
            addMedicine(task);
            break;
        case "update/medicine":
            updateMedicine(task);
            break;
        case "delete/medicine":
            deleteMedicine(task);
            break;
        case "update/medicineQuantity":
            updateMedicineQuantity(task);
            break;
        case "create/pharmacist":
            createPharmacist(task);
            break;
        case "update/pharmacist":
            updatePharmacist(task);
            break;
        case "delete/pharmacist":
            deletePharmacist(task);
            break;
        case "create/prescription":
            createPrescription(task);
            break;
        case "update/prescription":
            updatePrescription(task);
            break;
        case "delete/prescription":
            deletePrescription(task);
            break;
        case "create/prescriptionRequest":
            createPrescriptionRequest(task);
            break;
        case "update/prescriptionRequest":
            updatePrescriptionRequest(task);
            break;
        case "delete/prescriptionRequest":
            deletePrescriptionRequest(task);
            break;
        default:
            conlog(
                `Task type not recognized! Ignoring... \nTask: ID=${task.id}, Type=${task.type}, Data=${task.data}`
            );
            return true;
    }

    return false;
};
