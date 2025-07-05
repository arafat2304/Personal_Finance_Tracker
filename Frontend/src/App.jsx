import { useEffect, useState } from "react";
import axios from "axios";

import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/transactions");
    setTransactions(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-3xl font-bold tracking-tight">💰 Personal Finance Visualizer</h1>
        </header>

        {/* Add / Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add / Edit Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm
              fetchData={fetchData}
              editData={editData}
              onEditDone={() => setEditData(null)}
            />
          </CardContent>
        </Card>

        {/* Transaction List */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList
              transactions={transactions}
              onEdit={setEditData}
              onDelete={handleDelete}
            />
            {transactions.length === 0 && (
              <p className="text-muted-foreground text-sm text-center mt-4">
                No transactions yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Monthly Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyBarChart transactions={transactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
