import { BudgetType } from "../../src/types/budget.types";
import apiFetch from "../auth/api";

export const createBudgetRequest = async (budget: BudgetType) => {
  return await apiFetch("/budgets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(budget),
  });
};

export const getBudgetsRequest = async () => {
  return await apiFetch("/budgets", {
    method: "GET",
    credentials: "include",
  });
};

export const updateBudgetRequest = async (id: string, budget: {}) => {
  return await apiFetch(`/budgets/${id}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(budget)
  })
};

export const deleteBudgetRequest = async (id: number) => {
  return await apiFetch(`/budgets/${id}`, {
    method: "DELETE",
    credentials: "include"
  })
};
