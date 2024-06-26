import mongoose, { Schema, Document } from "mongoose";

interface IPrescription extends Document {
    id: string;
    medicine: string;
    patient: string;
    doctor: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const PrescriptionSchema: Schema = new Schema(
    {
        id: { type: String, required: true },
        medicine: { type: Schema.Types.ObjectId, ref: "Medicine" },
        patient: { type: Schema.Types.ObjectId, ref: "User" },
        doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    },
    {
        timestamps: true,
    }
);

const Prescription = mongoose.model<IPrescription>(
    "Prescription",
    PrescriptionSchema
);

export default Prescription;
