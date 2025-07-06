import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Transport", "Rent", "Shopping", "Entertainment","Bills","Healtcare","Utilities","Education", "Other"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
