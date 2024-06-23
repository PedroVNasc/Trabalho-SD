import mongoose, { Schema, Document } from "mongoose";

interface IPrescription extends Document {
    id: number;
    medicine: string;
    patient: number;
    doctor: number;
}

const PrescriptionSchema: Schema = new Schema({
    id: { type: Number, required: true },
    medicine: { type: String, required: true },
    patient: { type: Number, required: true },
    doctor: { type: Number, required: true },
});

const Prescription = mongoose.model<IPrescription>(
    "Prescription", PrescriptionSchema
);
export default Prescription;
