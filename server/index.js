import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import transactionRoutes from "./routes/TransactionRoutes.js";
import budgetRoutes from "./routes/budgets.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("\u2705 MongoDB connected"))
  .catch((err) => console.error("\u274C MongoDB connection error:", err));

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

// Start Server
app.listen(port, () => {
  console.log(`\u{1F680} Server running on port ${port}`);
});