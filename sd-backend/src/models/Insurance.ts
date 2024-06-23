import mongoose, { Schema, Document } from "mongoose";

interface IInsurance extends Document {
    region: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const InsuranceSchema: Schema = new Schema(
    {
        region: { type: String, required: true },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Insurance = mongoose.model<IInsurance>("Insurance", InsuranceSchema);
export default Insurance;
