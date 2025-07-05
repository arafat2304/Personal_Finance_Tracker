import { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";

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
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
      <TransactionForm fetchData={fetchData} editData={editData} onEditDone={() => setEditData(null)} />
      <TransactionList transactions={transactions} onEdit={setEditData} onDelete={handleDelete} />
      <MonthlyBarChart transactions={transactions} />
    </div>
  );
}

export default App;
