import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext/SearchContext";

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) throw new Error("useSearch must be within a provider");

  return context;
};
