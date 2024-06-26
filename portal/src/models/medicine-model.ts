import mongoose, { Schema, Document } from "mongoose";

export interface IMedicine {
    id : string;
    name: string;
    genericName: string;
    brandName: string;
    dosageForm: string;
    strength: string;
    manufacturer: string;
    expiryDate: Date;
    batchNumber: string;
    indications: string[];
    contraindications?: string[];
    sideEffects?: string[];
    storageConditions?: string;
    price: number;
    prescriptionRequired: boolean;
    quantity: number; // Quantity of this medicine at the stock location
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the Medicine schema
export const MedicineSchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true},
        name: { type: String, required: true },
        genericName: { type: String, required: true },
        brandName: { type: String, required: true },
        dosageForm: { type: String, required: true },
        strength: { type: String, required: true },
        manufacturer: { type: String, required: true },
        expiryDate: { type: Date, required: true },
        batchNumber: { type: String, required: true, unique: true },
        indications: { type: [String], required: true },
        contraindications: { type: [String] },
        sideEffects: { type: [String] },
        storageConditions: { type: String },
        price: { type: Number, required: true },
        prescriptionRequired: { type: Boolean, required: true },
        quantity: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Medicine = mongoose.model<IMedicine>("Medicine", MedicineSchema);

export default Medicine;
