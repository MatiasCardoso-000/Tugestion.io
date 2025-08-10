import { Expenses } from "../types/expenses.types";

export const useFilter = () => {
  const filteredExpenses = (expenses: Expenses[], inputValue: string) => {
    return expenses.filter((expense) =>
      expense.description
        .toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase())
    );

  };

  

  return {
    filteredExpenses,
  };
};
