import { createContext } from "react";
import { BudgetType } from "../../types/budget.types";

interface BudgetContextType {
  budgets: BudgetType[];
  getBudgets: () => void;
  createBudget: (budget: BudgetType) => void;
  updateBudget: (id: number, budget: BudgetType) => void;
  deleteBudget: (id: number) => void;
  errors: string[];
  isLoading: boolean;
}

export const BudgetContext = createContext<BudgetContextType>({
  budgets: [],
  getBudgets: () => { },
  createBudget: () => { },
  updateBudget: () => { },
  deleteBudget: () => { },
  errors: [],
  isLoading: true,
});
