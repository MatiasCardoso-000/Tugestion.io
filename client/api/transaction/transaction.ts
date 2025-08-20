import {  Transactions } from "../../src/types/transcations.types";
import apiFetch from "../auth/api";

export const addExpenseRequest = async (data: Transactions[]) => {
  return await apiFetch("/transactions/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const getExpensesByUserRequest = async () => {
  return await apiFetch(`/transactions/transaction`, {
    method: "GET",
    credentials: "include",
  });
};


export const getExpenseByIdRequest = async(id:string)=> {
  return await apiFetch(`/transactions/transaction/${id}`, {
    method: "GET",
    credentials: "include",
  });

}

export const deleteExpenseRequest = async (id: string) => {
  return await apiFetch(`/expenses/expense/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};