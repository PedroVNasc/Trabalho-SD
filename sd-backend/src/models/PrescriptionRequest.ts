import mongoose, { Schema, Document } from "mongoose";

interface IPrescriptionRequest extends Document {
    prescription: string;
    aproved: boolean;
    readiness: string;
    pharmacist: string;
    requestDate: Date;
    deliveryDate: Date;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const PrescriptionRequestSchema: Schema = new Schema(
    {
        prescription: { type: Schema.Types.ObjectId, required: true},
        aproved: { type: Boolean, required: true },
        readiness: { type: String, required: true },
        pharmacist: { type: String, required: true },
        requestDate: { type: Date, required: true },
        deliveryDate: { type: Date, required: true },
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const PrescriptionRequest = mongoose.model<IPrescriptionRequest>(
    "PrescriptionRequest",
    PrescriptionRequestSchema
);
export default PrescriptionRequest;
