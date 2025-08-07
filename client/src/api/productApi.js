import axios from "axios";
export const fetchCategories = () => axios.get(`${API}/categories`);
export const fetchSubcategories = () => axios.get(`${API}/subcategories`);

const API = import.meta.env.VITE_API_URL;

export const fetchProducts = () => axios.get(`${API}/products`);
export const createProduct = (data) => axios.post(`${API}/products`, data);
export const updateProduct = (id, data) =>
  axios.put(`${API}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API}/products/${id}`);
