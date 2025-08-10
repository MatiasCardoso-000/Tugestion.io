import { createContext } from "react";
import { Expenses } from "../../types/expenses.types";

interface SearchContextType {
  inputValue: string;
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInputValue: (value: string) => void;
  resetSearch: () => void;
}

export const SearchContext = createContext<SearchContextType>({
  inputValue: "",
  getInputValue: () => {},
  setInputValue: () => {},
  resetSearch: () => {},
});
