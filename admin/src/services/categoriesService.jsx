import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
export const categoriesService = () => {
  const { setLoading, backendUrl } = useContext(ShopContext);

  const getAllCategories = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/categories");
      if (!res.data.success) {
        toast.error(res.data.message);
        return null;
      }
      return res.data.data;
    } catch (err) {
      toast.error("Failed to fetch categories: " + (err.message || ""));
      console.error(err);
      return null;
    }
  };

  const createCategory = async (data) => {
    try {
      const res = await axios.post(backendUrl + "/api/categories/add", data);
      return res.data;
    } catch (err) {
      toast.error("Failed to create category: " + (err.message || ""));
      console.error(err);
    }
  };

  const updateCategory = async (data) => {
    try {
      const res = await axios.put(backendUrl + "/api/categories/update", data);
      return res.data;
    } catch (err) {
      toast.error("Failed to update category: " + (err.message || ""));
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.post(backendUrl + "/api/categories/delete", {
        id,
      });
      return res.data;
    } catch (err) {
      toast.error("Failed to delete category: " + (err.message || ""));
      console.error(err);
    }
  };

  return { getAllCategories, createCategory, deleteCategory, updateCategory };
};
