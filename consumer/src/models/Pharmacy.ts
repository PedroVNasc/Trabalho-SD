import mongoose, { Schema, Document } from "mongoose";
import { IMedicine, MedicineSchema } from "./Medicine";

// Define the interface for the Stock schema
export interface IPharmacy extends Document {
    region: string;
    name: string;
    address: string;
    medicines: IMedicine[];
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the Stock schema with embedded medicines
export const PharmacyStock: Schema = new Schema(
    {
        region: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true, unique: true },
        medicines: { type: [MedicineSchema], required: true },
    },
    {
        timestamps: true,
    }
);

// Create the Stock model from the schema and export it
const Pharmacy = mongoose.model<IPharmacy>("Pharmarcy", PharmacyStock);

export default Pharmacy;
