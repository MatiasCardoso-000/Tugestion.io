import { createContext } from "react";
import { Expenses } from "../../types/expenses.types";

interface ExpensesContextType {
  expenses: Expenses[];
  addExpense: (expense: Expenses[]) => void;
  deleteExpense: (id: string) => void;
  // getExpensesByUser: () => void;
  // getExpenseById: (id: string) => void;
  // updateExpense: (id: string, expense: Expenses) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  // getExpensesByUser: () => {},
  // getExpenseById: () => {},
  // updateExpense: () => {},
});
