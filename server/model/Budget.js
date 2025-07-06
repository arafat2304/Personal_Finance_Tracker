// server/models/Budget.js
import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
    enum: ["Food", "Transport", "Rent", "Shopping", "Entertainment","Bills","Healtcare","Utilities","Education", "Other"],
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Budget", BudgetSchema);