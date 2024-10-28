import { get, post, put } from "./index";

export const getProducts = async () => {
  return get("/products/all");
};

export const createProduct = async (data) => {
  return post("/products/create", data);
};

export const getManProducts = async () => {
  return get("/products/gender/man");
};

export const getWomanProducts = async () => {
  return get("/products/gender/women");
};

export const getKidProducts = async () => {
  return get("/products/gender/kid");
};

export const getUnisexProducts = async () => {
  return get("/products/gender/unisex");
};

export const getProductById = async (id) => {
  return get(`/products/${id}`);
};

export const updateProduct = async (id, data) => {
  return put(`/products/update/${id}`, data);
};
