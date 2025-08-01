import { useEffect, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { Category } from "../../types/categories.types";
import { createCategoryRequest, deleteCategoryRequest, getCategoriesRequest, updateCategoryRequest } from "../../../api/categories/categories";
import { useAuth } from "../../hooks/useAuth";

interface CategoriesProviderType {
  children: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Category[]>([]);
 const {isAuthenticated} =  useAuth()
  const [savedCategoryId, setSavedCategoryId] = useState<string[]>([]);
  const [toUpdate, setToUpdate] = useState(false);


  const createCategory = async(category:Category)=> {
    const res = await createCategoryRequest(category)
    const newCategory = await res.json()
    setCategories((prevCategories) => [...prevCategories,newCategory])
    setSavedCategoryId([])
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


  const updateCategory = async(category_id:string,category:string) => {
    await updateCategoryRequest(category_id,category)
  }


  const deleteCategory = async( category_id:string) => {
    await deleteCategoryRequest(category_id)
  }


  const handleUpdate = (id: string) => {
    setToUpdate(!toUpdate);
    setSavedCategoryId([id]);
  };



  useEffect(() => {
    getCategories();
  },[isAuthenticated,categories]);

  return (
    <CategoriesContext.Provider value={{ categories,createCategory,getCategories,updateCategory,deleteCategory,savedCategoryId,toUpdate,handleUpdate }}>
      {children}
    </CategoriesContext.Provider>
  );
};
