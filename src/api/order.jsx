import { post, get } from "./index";

export const createOrder = async (data) => {
  return post("/orders", data);
};

export const getOrders = async () => {
  return get("/orders");
};
