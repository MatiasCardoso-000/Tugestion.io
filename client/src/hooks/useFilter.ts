import { Transactions } from "../types/transcations.types";

export const useFilter = () => {
  const filteredExpenses = (expenses: Transactions[], inputValue: string) => {
    return expenses.filter((expense) => {
      if (
        expense.description !== null &&
        expense.description
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase())
      ) 
      return true;
    else if(expense.description === null) return true;
    else return false;
    });
  };

  return {
    filteredExpenses,
  };
};
