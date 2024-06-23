import mongoose, { Schema, Document } from 'mongoose';

interface IInsurance extends Document {
    region: string;
}

const InsuranceSchema: Schema = new Schema({
    region: { type: String, required: true },
});

const Insurance = mongoose.model<IInsurance>('Insurance', InsuranceSchema);
export default Insurance;
