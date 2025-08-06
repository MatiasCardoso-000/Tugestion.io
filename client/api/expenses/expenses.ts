import { Expenses } from "../../src/types/expenses.types";
import apiFetch from "../auth/api";

export const addExpenseRequest = async (data: Expenses[]) => {
  return await apiFetch("/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const getExpensesByUserRequest = async () => {
  return await apiFetch(`/expenses`, {
    method: "GET",
    credentials: "include",
  });
};


export const getExpenseByIdRequest = async(id:string)=> {
  return await apiFetch(`/expenses/${id}`, {
    method: "GET",
    credentials: "include",
  });

}

export const deleteExpenseRequest = async (id: string) => {
  return await apiFetch(`/expenses/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};