import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
export const brandsService = () => {
  const { backendUrl } = useContext(ShopContext);

  const getAllBrands = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/brands");
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

  const createBrand = async (data) => {
    try {
      const res = await axios.post(backendUrl + "/api/brands", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return null;
      }

      return res.data;
    } catch (err) {
      toast.error("Failed to create category: " + (err.message || ""));
      console.error(err);
    }
  };

  const updateBrand = async (_id, data) => {
    try {
      const res = await axios.put(backendUrl + `/api/brands/${_id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res.data.success) {
        toast.error(res.data.message);
        return null;
      }
      return res.data;
    } catch (err) {
      toast.error("Failed to update category: " + (err.message || ""));
      console.error(err);
    }
  };

  const deleteBrand = async (id) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/brands/${id}`);
      return res.data;
    } catch (err) {
      toast.error("Failed to delete brand: " + (err.message || ""));
      console.error(err);
      return null;
    }
  };

  return { getAllBrands, createBrand, updateBrand, deleteBrand };
};
