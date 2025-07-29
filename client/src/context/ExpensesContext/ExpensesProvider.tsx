import React, { useState } from "react";
import { ExpensesContext } from "./ExpensesContext";
import { Expenses } from "../../types/expensees.types";

export const ExpensesProvider = ({ children }: { children: React.ReactNode }) => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);

  return (
    <ExpensesContext.Provider value={{ expenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
 