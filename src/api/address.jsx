import { get, post } from "./index";

export const getAddress = async (id) => {
  return get(`/addresses/${id}`);
};

export const addAddress = async (data) => {
  return post("/addresses/create", data);
};