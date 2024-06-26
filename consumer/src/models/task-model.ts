import mongoose, { Document, Schema } from "mongoose";

// Define TypeScript interface for Task
export interface ITask extends Document {
    id: string;
    type: string;
    data: any; 
    requestTime: Date;
    responseTime?: Date;
    status: string;
    caller: string;
    solver?: string;
}

// Define Mongoose Schema for Task
export const taskSchema = new Schema<ITask>({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true }, // Mixed type allows any data structure
    requestTime: { type: Date, required: true, default: Date.now },
    responseTime: { type: Date },
    status: { type: String, required: true },
    caller: { type: String, required: true },
    solver: { type: String },
});

// Create and export Mongoose model based on schema
export const TaskModel = mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
