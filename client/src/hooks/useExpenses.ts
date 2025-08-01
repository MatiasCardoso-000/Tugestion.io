import { useContext } from "react";
import { ExpensesContext } from "../context/ExpensesContext/ExpensesContext";

export const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    console.log("useExpenses must be used within an ExpensesProvider");

    throw new Error("useExpenses must be used within an ExpensesProvider");
  }

  return context;
};
