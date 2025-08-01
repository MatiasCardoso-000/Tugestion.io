import { createContext } from "react";
import { Category } from "../../types/categories.types";

interface CategoriesContextType {
  categories: Category[];
  createCategory: (category: Category) => void;
  updateCategory: (category_id: string,category:string) => void;
  deleteCategory: ( category_id: string) => void;
  getCategories: () => void;
  savedCategoryId: string[];
  toUpdate:boolean;
  handleUpdate:(id:string) => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  createCategory: (category: Category) => category,
  updateCategory: () => {},
  deleteCategory: () => {},
  getCategories: () => {},
  savedCategoryId: [],
  toUpdate: false,
  handleUpdate : () => {}
});
