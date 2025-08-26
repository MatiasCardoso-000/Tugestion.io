import React, { useEffect, useState } from "react";
import {
  getExpensesByUserRequest,
  addExpenseRequest,
  deleteExpenseRequest,
  getExpenseByIdRequest,
} from "../../../api/transaction/transaction";
import { useAuth } from "../../hooks/useAuth";
import {  Transactions } from "../../types/transcations.types";
import { TransactionsContext } from "./TransactionsContext";

export const TransactionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setExpenses] = useState<Transactions[]>([]);
  const [transaction, setExpense] = useState<Transactions | null>(null);
  const { isAuthenticated } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addExpense = async (expense: Transactions[]) => {
    try {
      const res = await addExpenseRequest(expense);
      const data = await res.json();
      setExpenses([...transactions, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getExpenseById = async (expenseId: string) => {
    try {
      setIsLoading(true);
    

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

  const deleteExpense = async (transactionId: string) => {
    try {
      await deleteExpenseRequest(transactionId);
      setExpenses(
        transactions.filter((transaction) => transaction.id !== transactionId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const getExpensesByUser = async () => {
        setIsLoading(true);
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
    <TransactionsContext.Provider
      value={{
        transactions,
        transaction,
        isLoading,
        errors,
        addExpense,
        getExpenseById,
        deleteExpense,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
