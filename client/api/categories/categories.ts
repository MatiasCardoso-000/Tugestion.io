import { Category } from "../../src/types/categories.types";
import apiFetch from "../auth/api";

export const createCategoryRequest = async (category: Category) => {
  return await apiFetch(`/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
};

export const getCategoriesRequest = async () => {
  return await apiFetch(`/categories`, {
    method: "GET",
  });
};

export const deleteCategoryRequest = async (id: string) => {
  return await apiFetch(`/categories/${id}`, {
    method: "DELETE",
  });
};
