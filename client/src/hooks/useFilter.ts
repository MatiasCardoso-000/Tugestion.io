import { Transactions } from "../types/transcations.types";

export const useFilter = () => {
  const filteredExpenses = (
    transactions: Transactions[],
    inputValue: string
  ) => {
    return transactions.filter((expense) => {

      return expense.description
        .toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase());
    });
  };
  return {
    filteredExpenses,
  };
};
