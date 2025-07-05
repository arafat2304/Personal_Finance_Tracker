import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function TransactionForm({ fetchData, editData, onEditDone }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editData) {
      setAmount(editData.amount);
      setDescription(editData.description);
      setDate(editData.date.split("T")[0]);
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { amount: +amount, description, date };

    //if editdata is true so edit mode is exist other wise new add
    if (editData) {
      await axios.put(`${import.meta.env.VITE_BASE_LINK}/api/transactions/${editData._id}`, data);
      onEditDone();
    } else {
      await axios.post(`${import.meta.env.VITE_BASE_LINK}/api/transactions`, data);
    }

    fetchData();
    setAmount(""); setDescription(""); setDate("");
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <Button type="submit">{editData ? "Update" : "Add"} Transaction</Button>
    </form>
  );
}
