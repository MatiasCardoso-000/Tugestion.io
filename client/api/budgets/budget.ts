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

export const updateBudget = async () => {};

export const deleteBudget = async () => {};
