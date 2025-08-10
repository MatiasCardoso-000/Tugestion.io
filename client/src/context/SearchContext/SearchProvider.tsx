import { useState } from "react";
import { SearchContext } from "./SearchContext";
import { Expenses } from "../../types/expenses.types";

export const SearchProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const resetSearch = () => {
    setInputValue("");
  };

  return (
    <SearchContext.Provider
      value={{ inputValue, getInputValue, setInputValue,resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
