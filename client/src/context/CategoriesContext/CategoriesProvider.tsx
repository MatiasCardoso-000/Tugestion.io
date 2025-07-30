import { useEffect, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { Category } from "../../types/categories.types";
import { createCategoryRequest, deleteCategoryRequest, getCategoriesRequest } from "../../../api/categories/categories";
import { useAuth } from "../../hooks/useAuth";

interface CategoriesProviderType {
  children: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Category[]>([]);
 const {isAuthenticated} =  useAuth()


  const createCategory = async(category:Category)=> {
    const res = await createCategoryRequest(category)
    const newCategory = await res.json()
    setCategories((prevCategories) => [...prevCategories,newCategory])
  }


  const getCategories = async () => {
    try {
      const res = await getCategoriesRequest();

      if (!res.ok) {
        setCategories([]);
        throw new Error("Hubo un problema en la peticion de las categorias");
      }

      const categoriesData = await res.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteCategory = async( category_id:string) => {
    await deleteCategoryRequest(category_id)
  }

  useEffect(() => {
    getCategories();
  },[isAuthenticated]);

  return (
    <CategoriesContext.Provider value={{ categories,createCategory,getCategories,deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};
