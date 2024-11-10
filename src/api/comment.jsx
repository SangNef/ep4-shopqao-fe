import { get, post } from "./index";

export const getComments = async (productId) => {
  return get(`/comments/product/${productId}`);
};

export const createComment = async (data) => {
  return post("/comments", data);
};