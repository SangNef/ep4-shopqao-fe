import { get } from "./index";

export const getDashboard = async () => {
  return get("/dashboard");
};
export const getAllOrders = async () => {
    return get("/dashboard/orders");
  }
  