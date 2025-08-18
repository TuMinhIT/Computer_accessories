import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const CategoryService = () => {
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

  return {
    getAllCategories,
  };
};
