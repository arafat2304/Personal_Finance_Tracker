import React from "react";

const DashboardSummary = ({ transactions }) => {
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const categoryCount = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0];

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-center">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-xl font-bold text-red-600">₹{total}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-center">
        <h3 className="text-lg font-semibold mb-2">Top Category</h3>
        <p className="text-base">{topCategory || "—"}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-center">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <ul className="text-sm space-y-1">
          {recentTransactions.map((txn) => (
            <li key={txn._id}>
              {txn.category} – ₹{txn.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSummary;
