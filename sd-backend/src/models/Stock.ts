import mongoose, { Schema, Document } from "mongoose";


interface IStock extends Document {
    region: string;
    medicine: string;
    quantity: number;
}

const StockSchema: Schema = new Schema({
    region: { type: String, required: true },
    medicine: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const Stock = mongoose.model<IStock>(
    "Stock",
    StockSchema
);

export default Stock;
