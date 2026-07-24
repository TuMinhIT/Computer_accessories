
import axios from "axios";
import { toast } from "react-toastify";
import { httpClient } from "../services/httpClient";

export const CategoryService = () => {
  const resource = "/api/categories";

  const getAllCategories = async () => {
    try {
      const res = await httpClient.get(resource);

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
      const res = await httpClient.post(resource, data);

      if (!res.data.success) {
        throw new Error(res.data.message || "Unknown error");
      }

      return res.data;
    } catch (err) {
      toast.error("Failed to create category: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const updateCategory = async ({ id, name, description }) => {
    try {
      const res = await httpClient.put(`${resource}/${id}`, { name, description });

      if (!res.data.success) {
        throw new Error(res.data.message || "Unknown error");
      }
      return res.data;
    } catch (err) {
      toast.error("Failed to update category: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const deleteCategory = async ({ id }) => {
    try {
      const res = await httpClient.delete(resource + `/${id}`);

      if (!res.data.success) {
        throw new Error(res.data.message || "Unknown error");
      }
      return res.data;
    } catch (err) {
      toast.error("Failed to delete category: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };


  return {
    getAllCategories,
    createCategory, updateCategory,
    deleteCategory
  };
};

export default CategoryService;