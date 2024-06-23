import mongoose, { Schema, Document } from "mongoose";

interface IPharmacist extends Document {
    id: number;
    region: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    licenseNumber: string;
    pharmacyId?: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const PharmacistSchema: Schema = new Schema(
    {
        id: { type: Number, required: true },
        region: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        licenseNumber: { type: String, required: true, unique: true },
        pharmacyId: {
            type: Schema.Types.ObjectId,
            ref: "Pharmacy",
            required: false,
        },
    },
    { timestamps: true }
);

const Pharmacist = mongoose.model<IPharmacist>("Pharmacist", PharmacistSchema);
export default Pharmacist;
