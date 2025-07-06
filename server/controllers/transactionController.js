import Transaction from "../model/Transaction.js";

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

export const addTransaction = async (req, res) => {
  try {
    const { amount, description, date, category } = req.body;
    const newTransaction = new Transaction({ amount, description, date, category });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to create transaction", error });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction", error });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findByIdAndDelete(id);
  res.json({ message: "Transaction deleted" });
};
