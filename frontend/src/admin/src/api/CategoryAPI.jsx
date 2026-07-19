import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const CategoryAPI = () => {
  const { backendUrl } = useContext(ShopContext);

  const resource = "/api/categories";

  const getAllCategories = async () => {
    try {
      const res = await axios.get(backendUrl + resource);
      if (!res.data.success) {
        throw new Error(res.data.message || "Unknown error");
      }
      return res.data.data;
    } catch (err) {
      toast.error("Failed to fetch data: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const createCategory = async (data) => {
    try {
      const res = await axios.post(backendUrl + resource, data, {});
      return res.data;
    } catch (error) {
      toast.error("Failed to add category: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(backendUrl + resource + "/" + id);
      return res.data;
    } catch {
      toast.error("Failed to delete category: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const updateCategory = async ({ id, data }) => {
    const res = await axios.put(backendUrl + resource + "/" + id, data);
    return res.data;
  };
  return {
    getAllCategories,
    deleteCategory,
    updateCategory,
    createCategory,
  };
};
