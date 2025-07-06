import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SummaryCards = ({ transactions }) => {
  const total = transactions.reduce((acc, txn) => acc + Number(txn.amount), 0);
  const count = transactions.length;
  const lastTxn = transactions[transactions.length - 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">₹{total.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions Count</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{count}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Last Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          {lastTxn ? (
            <div>
              <p className="text-md font-medium">₹{lastTxn.amount}</p>
              <p className="text-sm text-muted-foreground">{lastTxn.description}</p>
              <p className="text-sm text-muted-foreground">{new Date(lastTxn.date).toLocaleDateString()}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
