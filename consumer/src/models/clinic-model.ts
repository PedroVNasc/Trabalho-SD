// clinic-model.ts
import mongoose, { Schema, Document } from "mongoose";

interface IClinic extends Document {
    id: string;
    region: string;
    users: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
}

const ClinicSchema: Schema = new Schema(
    {
        id: { type: String, required: true },
        region: { type: String, required: true },
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

const Clinic = mongoose.model<IClinic>("Clinic", ClinicSchema);
export default Clinic;
