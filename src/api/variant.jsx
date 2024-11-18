import { get, post, put } from "./index";

export const getCategories = () => {
  return get("/product-variants");
};

export const createProductVariant = (data) => {
  return post("/product-variants", data);
};

export const updateProductVariant = (id, data) => {
  return put(`/product-variants/${id}`, data);
};
