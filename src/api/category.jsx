import { get, post, put, del } from "./index";

export const getCategories = () => {
  return get("/categories");
};

export const createCategory = (data) => {
  return post("/categories", data);
};

export const updateCategory = (id, data) => {
  return put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  return del(`/categories/${id}`);
};
