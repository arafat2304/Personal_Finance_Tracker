// src/components/SpendingInsights.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SpendingInsights = () => {
  const [insights, setInsights] = useState({ topCategory: null, total: 0 });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_LINK}/api/transactions`);
        const transactions = res.data;

        const categoryTotals = transactions.reduce((acc, txn) => {
          acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
          return acc;
        }, {});

        const topCategory = Object.entries(categoryTotals).reduce(
          (max, curr) => (curr[1] > max[1] ? curr : max),
          ["", 0]
        );

        setInsights({
          topCategory: topCategory[0],
          total: transactions.reduce((sum, txn) => sum + txn.amount, 0),
        });
      } catch (err) {
        console.error("Failed to fetch transactions for insights.", err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {insights.topCategory ? (
          <div>
            <p className="text-lg">Most spent on: <strong>{insights.topCategory}</strong></p>
            <p className="text-sm text-muted-foreground">Total spent: ₹{insights.total}</p>
          </div>
        ) : (
          <p>No transactions to analyze.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingInsights;
