import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const ProductService = () => {
  const { backendUrl } = useContext(ShopContext);
  const resource = "/api/products";
  const getAllProducts = async () => {
    try {
      const res = await axios.get(backendUrl + resource);
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
  const getProduct = async ({ id }) => {
    try {
      const res = await axios.get(backendUrl + "/api/products/" + id);
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

  return {
    getProduct,
    getAllProducts,
  };
};
