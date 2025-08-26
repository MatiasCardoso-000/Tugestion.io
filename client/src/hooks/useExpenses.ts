import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext/TransactionsContext";

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    console.log("useExpenses must be used within an ExpensesProvider");

    throw new Error("useExpenses must be used within an ExpensesProvider");
  }

  return context;
};

