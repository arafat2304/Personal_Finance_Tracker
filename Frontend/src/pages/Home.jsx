// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyBarChart from "@/components/MonthlyBarChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import BudgetForm from "@/components/BudgetForm";
import BudgetOverview from "@/components/BudgetOverview";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DashboardSummary from "../components/DashboardSummary";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_LINK}/api/transactions`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_LINK}/api/budgets`);
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const handleTransactionAdded = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const handleDelete = () => {
    fetchTransactions();
  };

  const handleBudgetSaved = () => {
    fetchBudgets();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />


      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <DashboardSummary transactions={transactions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyBarChart transactions={transactions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category-wise Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart transactions={transactions} />
        </CardContent>
      </Card>

      <BudgetForm onBudgetSaved={handleBudgetSaved} />

      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetOverview budgets={budgets} transactions={transactions} />
        </CardContent>
      </Card>

    </div>
  );
};

export default Home;
