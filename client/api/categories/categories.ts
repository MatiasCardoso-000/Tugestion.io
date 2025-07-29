import apiFetch from "../auth/api";

export const getCategoriesRequest = async () => {
  return await apiFetch(`/categories`,{
    method:'GET'
  });
};
