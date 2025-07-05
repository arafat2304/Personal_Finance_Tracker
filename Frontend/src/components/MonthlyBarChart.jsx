import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyBarChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach(({ date, amount }) => {
    const month = new Date(date).toLocaleString("default", { month: "short", year: "numeric" });
    monthlyData[month] = (monthlyData[month] || 0) + amount;
  });

  const chartData = Object.keys(monthlyData).map((key) => ({
    name: key,
    amount: monthlyData[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
