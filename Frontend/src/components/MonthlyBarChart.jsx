import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const MonthlyBarChart = ({ transactions }) => {
  const monthlyTotals = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + Number(t.amount);
    return acc;
  }, {});

  const chartData = Object.keys(monthlyTotals).map((month) => ({
    name: month,
    total: monthlyTotals[month],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;
