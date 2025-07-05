import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
