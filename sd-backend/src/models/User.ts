import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    CNS: string;
    name: string;
    birthdate: Date;
    email?: string;
    phone?: string;
    password: string;
    sex: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
    {
        CNS: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        birthdate: { type: Date, required: true },
        email: { type: String },
        phone: { type: String },
        password: { type: String, required: true },
        sex: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
