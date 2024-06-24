import mongoose, { Schema, Document } from "mongoose";

interface IDoctor extends Document {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    specialty: string;
    licenseNumber: string;
    clinic?: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const DoctorSchema: Schema = new Schema(
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        specialty: { type: String, required: true },
        licenseNumber: { type: String, required: true, unique: true },
        clinic: {
            type: Schema.Types.ObjectId,
            ref: "Hospital",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
