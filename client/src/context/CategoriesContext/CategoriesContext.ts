import { createContext } from "react";
import { Category } from "../../types/categories.types";

interface CategoriesContextType {
  categories: Category[];
  createCategory: (category: Category) => void;
  updateCategory: (category_id: string, category: string) => void;
  deleteCategory: (category_id: string) => void;
  editingId: string ;
  setEditingId: (id: string) => void;
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  createCategory: (category: Category) => category,
  updateCategory: () => {},
  deleteCategory: () => {},
  editingId: "",
  setEditingId: () => {},
  newCategoryName: "",
  setNewCategoryName: () => {},
});
