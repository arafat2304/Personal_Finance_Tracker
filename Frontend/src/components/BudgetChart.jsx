import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const BudgetChart = ({ transactions }) => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_LINK}/api/budgets`).then((res) => setBudgets(res.data));
  }, []);

  const data = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      category: b.category,
      Budget: b.amount,
      Spent: spent,
    };
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Budget vs Actual</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="Budget" fill="#8884d8" />
            <Bar dataKey="Spent" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
