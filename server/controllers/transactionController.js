import Transaction from "../model/Transaction.js";

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

export const addTransaction = async (req, res) => {
  const { amount, description, date } = req.body;
  const newTransaction = await Transaction.create({ amount, description, date });
  res.json(newTransaction);
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ message: "Transaction deleted" });
};
