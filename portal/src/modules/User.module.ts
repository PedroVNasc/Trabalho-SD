// Important modules
import mongoose, { Schema, Document } from 'mongoose';

// User interface
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

// Mongoose user schema
const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Creating the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;