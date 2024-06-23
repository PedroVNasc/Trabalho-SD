import mongoose, { Schema, Document } from 'mongoose';

interface IPrescriptionRequest extends Document {
    prescription: string;
    readiness: string;
    pharmacist: string;
    requestDate: Date;
    deliveryDate: Date;
    status: string;
}

const PrescriptionRequestSchema: Schema = new Schema({
    prescription: { type: String, required: true },
    readiness: { type: String, required: true },
    pharmacist: { type: String, required: true },
    requestDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
    status: { type: String, required: true },
});

const PrescriptionRequest = mongoose.model<IPrescriptionRequest>('PrescriptionRequest', PrescriptionRequestSchema);
export default PrescriptionRequest;
