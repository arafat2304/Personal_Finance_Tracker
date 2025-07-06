import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BudgetSummary = ({ transactions }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_LINK}/api/budgets`).then((res) => setBudgets(res.data));
  }, []);

  const getTotalByCategory = (cat) => {
    return transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {budgets.map((b) => {
            const spent = getTotalByCategory(b.category);
            const isOver = spent > b.amount;
            return (
              <li key={b.category} className="text-sm">
                <strong>{b.category}:</strong> ₹{spent} / ₹{b.amount}{" "}
                {isOver && <span className="text-red-500">(Over budget!)</span>}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BudgetSummary;
