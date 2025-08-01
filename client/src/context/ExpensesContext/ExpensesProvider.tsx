import React, { useEffect, useState } from "react";
import { ExpensesContext } from "./ExpensesContext";
import { Expenses } from "../../types/expenses.types";
import {
  getExpensesByUserRequest,
  addExpenseRequest,
  deleteExpenseRequest,
} from "../../../api/expenses/expenses";
import { useAuth } from "../../hooks/useAuth";

export const ExpensesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const { isAuthenticated } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);

  const addExpense = async (expense: Expenses[]) => {
    try {
      await addExpenseRequest(expense);
    } catch (error) {
      console.log(error);
    }
  };

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

  const deleteExpense = async (expenseId: string) => {
    try {
      await deleteExpenseRequest(expenseId);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getExpensesByUser();
  }, [isAuthenticated,expenses]);

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense,deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
