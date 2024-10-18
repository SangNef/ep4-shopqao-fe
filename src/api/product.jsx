import { get, post } from './index';

export const getProducts = async () => {
    return get('/products/all');
};

export const createProduct = async (data) => {
    return post('/products', data);
};