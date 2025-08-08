import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

export const ProductsService = () => {
  const { setLoading, backendUrl } = useContext(ShopContext);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.post(backendUrl + "/api/products");
      if (res.success) {
        return res.data;
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to fetch products: " + (err.message || ""));
      console.error(err);
    } finally {
      setLoading(false);
      return null;
    }
  };

  const createProduct = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(backendUrl + "/api/products", data);
      return res.data;
    } catch (err) {
      toast.error("Failed to create product: " + (err.message || ""));
      console.error(err);
    } finally {
      setLoading(false);
      return null;
    }
  };

  const updateProduct = async (id, data) => {
    setLoading(true);
    try {
      const res = await axios.put(backendUrl + "/api/products/" + id, data);
      return res.data;
    } catch (err) {
      toast.error("Failed to update product: " + (err.message || ""));
      console.error(err);
    } finally {
      setLoading(false);
      return null;
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(backendUrl + "/api/products/" + id);
      return res.data;
    } catch (err) {
      toast.error("Failed to delete product: " + (err.message || ""));
      console.error(err);
    } finally {
      setLoading(false);
      return null;
    }
  };

  return { getAllProducts };
};
