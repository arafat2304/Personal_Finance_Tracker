import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import transactionRoutes from "./routes/TransactionRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//route API
app.use("/api/transactions", transactionRoutes);


//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch((err) => console.log(err));
