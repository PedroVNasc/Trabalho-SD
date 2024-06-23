import mongoose, { Schema, Document } from "mongoose";

interface IDoctor extends Document {
    id: number;
}

const DoctorSchema: Schema = new Schema({
    id: { type: Number, required: true },
});

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);
export default Doctor;
