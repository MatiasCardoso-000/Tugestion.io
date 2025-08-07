import { Expenses } from "../types/expenses.types";

export const useFilter = () => {
  const filteredExpenses = (expenses: Expenses[], inputValue) => {
    expenses.filter((expense) => {
      if (expense.description.includes(inputValue)) {
        return expense.description;
      }
    });
  };

  return {
    filteredExpenses,
  };
};
