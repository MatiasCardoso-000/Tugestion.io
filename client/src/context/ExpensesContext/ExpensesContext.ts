import { createContext } from "react";
import { Expenses } from "../../types/expensees.types";

interface ExpensesContextType {
  expenses: Expenses[],
  
}



export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: []
});
