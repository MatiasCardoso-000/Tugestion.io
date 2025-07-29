import { useContext } from "react";
import { CategoriesContext } from "../context/CategoriesContext/CategoriesContext";

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    console.log("useCategories must be used within an AuthProvider");
    
    throw new Error("useCategories must be used within an AuthProvider");
  }

  return context;
};


