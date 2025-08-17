import { useEffect, useState } from "react";
import { BudgetContext } from "./BudgetContext";
import { BudgetType } from "../../types/budget.types";
import { createBudgetRequest } from "../../../api/budgets/budget";

interface BudgetProviderProps {
  children: React.ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBudgets = async () => {};

  const createBudget = async (budget: BudgetType) => {
    console.log(budget);

    try {
      const res = await createBudgetRequest(budget);
      const budgetData = await res.json();
      setBudgets([...budgets, budgetData]);
      setErrors([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBudget = async (id: string, budget: BudgetType) => {};

  const deleteBudget = async (id: string) => {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 4000);
    return () => clearTimeout(timer);
  }, [errors]);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        getBudgets,
        createBudget,
        updateBudget,
        deleteBudget,
        errors,
        isLoading,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
