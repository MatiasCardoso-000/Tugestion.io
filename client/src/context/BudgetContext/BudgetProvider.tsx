import { useEffect, useState } from "react";
import { BudgetContext } from "./BudgetContext";
import { BudgetType } from "../../types/budget.types";
import {
  createBudgetRequest,
  deleteBudgetRequest,
  getBudgetsRequest,
} from "../../../api/budgets/budget";

interface BudgetProviderProps {
  children: React.ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBudgets = async () => {
    try {
      const res = await getBudgetsRequest();

      const budgetData = await res.json();
      setBudgets([...budgets, ...budgetData]);
      setErrors([]);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createBudget = async (budget: BudgetType) => {
    try {
      const res = await createBudgetRequest(budget);
      const budgetData = await res.json();

      if (!res.ok) {
        let errorMessages: string[] = [];

        if (budgetData.message) {
          errorMessages = [budgetData.message];
        }
        setErrors(errorMessages);
        return;
      }

      setBudgets([...budgets, budgetData]);
      setErrors([]);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateBudget = async (id: number, budget: BudgetType) => { };

  const deleteBudget = async (id: number) => {
    try {
      await deleteBudgetRequest(id)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 3000);
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
