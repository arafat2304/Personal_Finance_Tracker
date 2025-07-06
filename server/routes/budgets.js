// server/routes/budgets.js
import express from "express";
import Budget from "../model/Budget.js";

const router = express.Router();

// Get all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// Create or update a budget
router.post("/", async (req, res) => {
  try {
    const { category, amount } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ error: "Category and amount are required" });
    }

    const existing = await Budget.findOne({ category });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      res.json(existing);
    } else {
      const newBudget = new Budget({ category, amount });
      await newBudget.save();
      res.status(201).json(newBudget);
    }
  } catch (err) {
    console.error("Failed to save budget", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;