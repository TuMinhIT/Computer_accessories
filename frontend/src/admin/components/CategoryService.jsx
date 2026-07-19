import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { httpClient } from "../../services/httpClient";
export const CategoryService = () => {
  const resource = "/api/categories";

  const getAllCategories = async () => {
    try {
      const res = await httpClient.get(resource);
      console.log(res.data);
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


  return {
    getAllCategories,
  };
};
