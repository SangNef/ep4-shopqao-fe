import { get } from "./index"

export const getVouchers = async () => {
  return get("/vouchers");
};