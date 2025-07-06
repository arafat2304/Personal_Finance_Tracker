// src/components/BudgetForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const predefinedCategories = [
   "Food",
    "Transport",
    "Rent",
    "Shopping",
    "Bills",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Other"
];

const BudgetForm = ({ onBudgetSaved }) => {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_LINK}/api/budgets`, {
        category,
        amount: Number(amount),
      });
      setAmount("");
      setError("");
      setSuccess("Budget saved successfully");
      if (onBudgetSaved) onBudgetSaved(res.data);
    } catch (err) {
      setError("Failed to save budget");
      setSuccess("");
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Set Budget for Category</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <select
            className="border rounded-md px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {predefinedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Button type="submit" className="md:col-span-2 w-full">
            Save Budget
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
