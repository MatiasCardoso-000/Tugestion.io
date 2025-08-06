import React, { useEffect, useState } from "react";
import { ExpensesContext } from "./ExpensesContext";
import { Expenses } from "../../types/expenses.types";
import {
  getExpensesByUserRequest,
  addExpenseRequest,
  deleteExpenseRequest,
  getExpenseByIdRequest,
} from "../../../api/expenses/expenses";
import { useAuth } from "../../hooks/useAuth";
import { set } from "react-hook-form";

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [expense, setExpense] = useState<Expenses>({} as Expenses);
  const { isAuthenticated } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);

  const addExpense = async (expense: Expenses[]) => {
    try {
      const res = await addExpenseRequest(expense);
      const data = await res.json();
      setExpenses([...expenses, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenseById = async (expenseId: string) => {
    try {
      const res = await getExpenseByIdRequest(expenseId);
      if (!res.ok) {
        throw new Error("Error al obtener el gasto");
      }
      const data = await res.json();
      // If the API returns the expense directly, use setExpense(data)
      // If it returns { expense: ... }, use setExpense(data.expense)
      setExpense(data.expense ?? data);
    } catch (error: any) {
      setErrors([error.message || "Error desconocido al obtener el gasto"]);
      console.log(error);
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
        try {
          const res = await getExpensesByUserRequest();
          if (!res.ok) {
            throw new Error("Error al obtener los gastos del usuario");
          }
          const data = await res.json();
          setExpenses(data);
        } catch (error) {
          setErrors(error);
        }
      };
      getExpensesByUser();
    }
  }, [isAuthenticated]);

  return (
    <ExpensesContext.Provider
      value={{ expenses, expense, addExpense, getExpenseById, deleteExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
