import { useEffect, useState } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { Categories } from "../../types/categories.types";
import { getCategoriesRequest } from "../../../api/categories/categories";

interface CategoriesProviderType {
  children: React.ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderType) => {
  const [categories, setCategories] = useState<Categories[]>([]);

  const getCategories= async () => {
    const res = await getCategoriesRequest();
    const categoriesData = await res.json()
    console.log(categoriesData);
  };

  useEffect(() => {
    getCategories();
  });

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
