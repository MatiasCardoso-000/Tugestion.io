import { createContext } from "react";
import { Category } from "../../types/categories.types";

interface CategoriesContextType {
  categories: Category[];
  createCategory: (category: Category) => void;
  deleteCategory: ( category_id: string) => void;
  getCategories: () => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  createCategory: (category: Category) => category,
  deleteCategory: () => {},
  getCategories: () => {},
});
