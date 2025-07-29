import { createContext } from "react";
import { Categories } from "../../types/categories.types";

interface CategoriesContextType {
  categories: Categories[];
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
});
