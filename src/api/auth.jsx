import { get, post, put } from "./index";

export const register = async (data) => {
  return post("/auth/register", data);
};

export const login = async (data) => {
  return post("/auth/login", data);
};

export const updateProfile = async (id, data) => {
  return put(`/auth/updateProfile/${id}`, data);
};

export const updatePassword = async (id, data) => {
  return put(`/auth/changePassword/${id}`, data);
};

export const getUsers = async () => {
  return get("/auth/users");
};
