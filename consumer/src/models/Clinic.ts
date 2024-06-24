import mongoose, { Schema, Document } from "mongoose";

interface IClinic extends Document {
    id: number;
    region: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ClinicSchema: Schema = new Schema(
    {
        id: { type: Number, required: true },
        region: { type: String, required: true },
        users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    {
        timestamps: true,
    }
);

const Clinic = mongoose.model<IClinic>("Doctor", ClinicSchema);
export default Clinic;
