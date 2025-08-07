import { useEffect, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { Category } from "../../types/categories.types";
import {
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesByUserRequest,
  updateCategoryRequest,
} from "../../../api/categories/categories";
import { useAuth } from "../../hooks/useAuth";

interface CategoriesProviderType {
  children: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated } = useAuth();
  const [editingId, setEditingId] = useState<string>("");
  const [updateCategoryName, setUpdateCategoryName] = useState<string>("");
  const [createNewCategory, setCreateNewCategory] = useState(false);

  const createCategory = async (category: Category) => {
    const res = await createCategoryRequest(category);
    const newCategory = await res.json();
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const updateCategory = async (
    category_id: string,
    newCategoryName: string
  ) => {
    await updateCategoryRequest(category_id, newCategoryName);
    setCategories((prevCategories) =>
      prevCategories.map((prevCategory) =>
        prevCategory.category_id === category_id
          ? { ...prevCategory, category_name: newCategoryName }
          : prevCategory
      )
    );
  };

  const deleteCategory = async (category_id: string) => {
    await deleteCategoryRequest(category_id);
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.category_id !== category_id)
    );
  };


  useEffect(() => {
    if (isAuthenticated) {
      const getCategoriesByUser = async () => {
        try {
          const res = await getCategoriesByUserRequest();
          const categoriesData = await res.json();
          setCategories(categoriesData);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      getCategoriesByUser();
    }
  }, [isAuthenticated]);


  return (
    <CategoriesContext.Provider
      value={{
        categories,
        createNewCategory,
        editingId,
        updateCategoryName,
        createCategory,
        updateCategory,
        deleteCategory,
        setEditingId,
        setUpdateCategoryName,
        setCreateNewCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
