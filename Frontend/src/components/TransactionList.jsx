// src/components/TransactionList.jsx
import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TransactionList = ({ transactions, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ description: "", amount: "", date: "", category: "" });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_LINK}/api/transactions/${id}`);
      if (onDelete) onDelete();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (txn) => {
    setEditingId(txn._id);
    setEditData({
      description: txn.description,
      amount: txn.amount,
      date: txn.date.slice(0, 10),
      category: txn.category,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_BASE_LINK}/api/transactions/${editingId}`, editData);
      setEditingId(null);
      setEditData({ description: "", amount: "", date: "", category: "" });
      if (onDelete) onDelete();
    } catch (err) {
      console.error("Edit failed", err);
    }
  };

  if (!Array.isArray(transactions)) {
    return (
      <Card className="my-4">
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Invalid transaction data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Transaction List</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map((txn) => (
              <li key={txn._id} className="border rounded p-4">
                {editingId === txn._id ? (
                  <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    <Input
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      required
                    />
                    <Input
                      type="number"
                      value={editData.amount}
                      onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                      required
                    />
                    <Input
                      type="date"
                      value={editData.date}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                      required
                    />
                    <Input
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      required
                    />
                    <div className="flex gap-1">
                      <Button type="submit">Save</Button>
                      <Button variant="ghost" type="button" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <p className="font-medium">{txn.description}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{txn.amount} • {new Date(txn.date).toLocaleDateString()} • {txn.category}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="secondary" onClick={() => handleEdit(txn)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => handleDelete(txn._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
