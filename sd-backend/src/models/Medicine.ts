import mongoose, { Schema, Document } from "mongoose";

interface IMedicine extends Document {
    id: number;
    label: string;
}

const MedicineSchema: Schema = new Schema({
    id: { type: Number, required: true },
    label: { type: String, required: true },
});

const Medicine = mongoose.model<IMedicine>("Medicine", MedicineSchema);
export default Medicine;
