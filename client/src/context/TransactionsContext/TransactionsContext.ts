import { createContext } from "react";
import { Transactions } from "../../types/transcations.types";

interface TransactionsContextType {
  transactions: Transactions[];
  transaction: Transactions | null;
  isLoading: boolean;
  errors: string[];
  addExpense: (expense: Transactions[]) => void;
  deleteExpense: (id: string) => void;
  // getExpensesByUser: () => void;
  getExpenseById: (id: string) => void;
  // updateExpense: (id: string, expense: Expenses) => void;
}

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  transaction: null,
  isLoading: true,
  errors: [],
  addExpense: () => {},
  deleteExpense: () => {},
  // getExpensesByUser: () => {},
  getExpenseById: () => {},
  // updateExpense: () => {},
});
