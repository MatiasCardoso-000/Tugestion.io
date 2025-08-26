import { useEffect, useState } from "react";
import { BudgetContext } from "./BudgetContext";
import { BudgetType } from "../../types/budget.types";
import {
  createBudgetRequest,
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
      setBudgets(budgetData);
      setErrors([]);
      setIsLoading(false);
    } catch (error) {
      setErrors(error.res.message);
      console.log(error.res.message);
    }
  };

  const createBudget = async (budget: BudgetType) => {
    try {
      const res = await createBudgetRequest(budget);
      const budgetData = await res.json();
      console.log(budgetData);
      
      if (!res.ok) {
        let errorMessages;

        if (budgetData.message) {
          errorMessages = [budgetData.message];
        }
        setErrors(errorMessages);
        return
      }

      setBudgets([...budgets, budgetData]);
      setErrors([]);
      setIsLoading(false);
    } catch (error) {
      setErrors(["Hubo un problema al crear el presupuesto"]);
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
