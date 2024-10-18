import { post } from "./index";

export const register = async (data) => {
    return post('/auth/register', data);
}

export const login = async (data) => {
    return post('/auth/login', data);
}