import { del, get, post, put } from "./index";

export const getProducts = async (params) => {
  return get("/products/all", params);
};

export const createProduct = async (data) => {
  return post("/products/create", data);
};

export const getManProducts = async (category = '', sortDirection = 'asc') => {
  const query = new URLSearchParams();

  if (category) {
    query.append('category', category);
  }
  query.append('sortDirection', sortDirection);

  return get(`/products/gender/man?${query.toString()}`);
};

export const getWomanProducts = async (category = '', sortDirection = 'asc') => {
  const query = new URLSearchParams();

  if (category) {
    query.append('category', category);
  }
  query.append('sortDirection', sortDirection);

  return get(`/products/gender/women?${query.toString()}`);
};

export const getKidProducts = async (category = '', sortDirection = 'asc') => {
  const query = new URLSearchParams();

  if (category) {
    query.append('category', category);
  }

  query.append('sortDirection', sortDirection);

  return get(`/products/gender/kid?${query.toString()}`);
};

export const getUnisexProducts = async (category = '', sortDirection = 'asc') => {
  const query = new URLSearchParams();

  if (category) {
    query.append('category', category);
  }

  query.append('sortDirection', sortDirection);

  return get(`/products/gender/unisex?${query.toString()}`);
};

export const getProductById = async (id) => {
  return get(`/products/${id}`);
};

export const updateProduct = async (id, data) => {
  return put(`/products/update/${id}`, data);
};

export const deleteProduct = async (id) => {
  return del(`/products/delete/${id}`);
};

export const deleteProductVariant = async (variantId) => {
  return del(`/product-variants/delete/${variantId}`);
};