import { post, get, put } from "./index";

export const createOrder = async (data) => {
  return post("/orders", data);
};

export const getOrders = async (status) => {
  const url = status ? `/orders?status=${status}` : '/orders'; // Nếu không có status thì lấy tất cả
  return get(url);
};

export const getOrderById = async (id) => {
  return get(`/orders/${id}`);
};

export const getProvinces = async () => {
  return get("/orders/provinces");
};

export const getDistricts = async (provinceId) => {
  return get(`/orders/districts/${provinceId}`);
};

export const getWards = async (districtId) => {
  return get(`/orders/wards/${districtId}`);
};

export const updateOrder = async (id, data) => {
  return put(`/orders/update-status/${id}`, data);
};

export const cancelOrder = async (id) => {
  return put(`/orders/cancel/${id}`);
};

export const getOrdersByUser = async (id) => {
  return get(`/orders/user/${id}`);
};

export const acpCancelOrder = async (id) => {
  return put(`/orders/accept-cancel/${id}`);
};

export const returnOrder = async (id) => {
  return put(`/orders/return/${id}`);
};

export const acpReturnOrder = async (id) => {
  return put(`/orders/accept-return/${id}`);
};