import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TransactionForm = ({ onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_LINK}/api/transactions`, {
        amount,
        description,
        date,
        category,
      });
      setAmount("");
      setDescription("");
      setDate("");
      setCategory("");
      setError("");
      if (onTransactionAdded) onTransactionAdded(res.data);
    } catch (err) {
      setError("Failed to save transaction");
      console.error("Transaction save error:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
            required
          >
            <option value="">Select Category</option>
            {predefinedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Button type="submit" className="md:col-span-2 w-full">
            Add Transaction
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
