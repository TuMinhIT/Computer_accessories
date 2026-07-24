import { toast } from "react-toastify";
import { httpClient } from "./httpClient";
export const BrandService = () => {

  const resource = "/api/brands";

  const getAllBrands = async () => {
    try {
      const res = await httpClient.get(resource);
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
      const res = await httpClient.post(resource, data);

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

  const updateBrand = async ({ id, data }) => {
    try {

      const res = await httpClient.put(`${resource}/${id}`, data);
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
      const res = await httpClient.delete(`${resource}/${id}`);

      if (!res.data.success) {
        toast.error(res.data.message);
        return null;
      }
      return res.data;
    } catch (err) {
      toast.error("Failed to delete brand: " + (err.message || ""));
      console.error(err);
      return null;
    }
  };

  return { getAllBrands, createBrand, updateBrand, deleteBrand };
};

export default BrandService