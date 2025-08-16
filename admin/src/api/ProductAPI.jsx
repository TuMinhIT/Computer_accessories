import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const ProductAPI = () => {
  const { backendUrl } = useContext(ShopContext);

  const getProducts = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/products");
      if (!res.data.success) {
        throw new Error(res.data.message || "Unknown error");
      }
      return res.data.data;
    } catch (err) {
      toast.error("Failed to fetch products: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const createProduct = async (data) => {
    try {
      const res = await axios.post(backendUrl + "/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      toast.error("Failed to add products: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(backendUrl + `/api/products/${id}`);
      return res.data;
    } catch {
      toast.error("Failed to delete products: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const updateProduct = async ({ id, data }) => {
    const res = await axios.put(backendUrl + `/api/products/${id}`, data);
    return res.data;
  };
  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
