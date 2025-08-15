import { createContext } from "react";
import { Budget } from "../../types/budget.types";

interface BudgetContextType {
  budgets: Budget[];
  getBudgets: () => void;
  createBudget: (budget: Budget) => void;
  updateBudget: (id: string, budget: Budget) => void;
  deleteBudget: (id: string) => void;
  errors: string[];
  isLoading: boolean;
}

export const BudgetContext = createContext<BudgetContextType>({
  budgets: [],
  getBudgets: () => {},
  createBudget: () => {},
  updateBudget: () => {},
  deleteBudget: () => {},
  errors: [],
  isLoading: true,
});
