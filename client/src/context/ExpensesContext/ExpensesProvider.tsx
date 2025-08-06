import React, { useEffect, useState } from "react";
import { ExpensesContext } from "./ExpensesContext";
import {
  getExpensesByUserRequest,
  addExpenseRequest,
  deleteExpenseRequest,
  getExpenseByIdRequest,
} from "../../../api/expenses/expenses";
import { useAuth } from "../../hooks/useAuth";
import { set } from "react-hook-form";
import { Expenses } from "../../types/expenses.types";

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [expense, setExpense] = useState<Expenses | null>(null);
  const { isAuthenticated } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addExpense = async (expense: Expenses[]) => {
    try {
      const res = await addExpenseRequest(expense);
      const data = await res.json();
      setExpenses([...expenses, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getExpenseById = async (expenseId: string) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await getExpenseByIdRequest(expenseId);
      if (!res.ok) {
        throw new Error("Error al obtener el gasto");
      }
      const expenseData = await res.json();

      setExpense(expenseData.expense);
    } catch (error: any) {
      setExpense(null);

      setErrors([error.message || "Error desconocido al obtener el gasto"]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpense = async (expenseId: string) => {
    try {
      await deleteExpenseRequest(expenseId);
      setExpenses(
        expenses.filter((expense) => expense.expense_id !== expenseId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const getExpensesByUser = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          const res = await getExpensesByUserRequest();
          if (!res.ok) {
            throw new Error("Error al obtener los gastos del usuario");
          }
          const data = await res.json();
          setExpenses(data);
        } catch (error) {
          setErrors(error);
        } finally {
          setIsLoading(false);
        }
      };
      getExpensesByUser();
    }
  }, [isAuthenticated]);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        expense,
        isLoading,
        errors,
        addExpense,
        getExpenseById,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
