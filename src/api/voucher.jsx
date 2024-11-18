import { get, post, put, del } from "./index";

export const getVouchers = async () => {
  return get("/vouchers");
};

export const createVoucher = async (data) => {
  return post("/vouchers", data);
};

export const searchVoucher = async (code) => {
  return get(`/vouchers/search/${code}`);
};

export const updateVoucher = async (id, data) => {
  return put(`/vouchers/${id}`, data);
};

export const deleteVoucher = async (id) => {
  return del(`/vouchers/${id}`);
}
