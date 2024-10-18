import axios from "axios";

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const get = async (url) => {
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const post = async (url, data, config= {}) => {
    try {
        const response = await api.post(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const put = async (url, data) => {
    try {
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const del = async (url) => {
    try {
        const response = await api.delete(url);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}