import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext/BudgetContext";

export const useBudgets = () => {
  const context = useContext(BudgetContext);

  if (!context) {
    console.log("useBudgts must be used within an AuthProvider");

    throw new Error("useBudgts must be used within an AuthProvider");
  }

  return context;
};
