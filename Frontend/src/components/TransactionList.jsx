import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div className="space-y-2 mt-4">
      {transactions.map((t) => (
        <div key={t._id} className="flex justify-between items-center p-2 border rounded-lg">
          <div>
            <p className="font-medium">₹{t.amount}</p>
            <p className="text-sm">{t.description}</p>
            <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
          </div>
          <div className="space-x-2">
            <Button size="sm" onClick={() => onEdit(t)}>Edit</Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(t._id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
