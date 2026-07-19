import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const BrandAPI = () => {
  const { backendUrl } = useContext(ShopContext);

  const resource = "/api/brands";

  const getAllBrand = async () => {
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

  const createBrand = async (data) => {
    try {
      const res = await axios.post(backendUrl + resource, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      toast.error("Failed to add Brand: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const deleteBrand = async (id) => {
    try {
      const res = await axios.delete(backendUrl + resource + "/" + id);
      return res.data;
    } catch {
      toast.error("Failed to delete Brand: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const updateBrand = async ({ id, data }) => {
    const res = await axios.put(backendUrl + resource + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };
  return {
    getAllBrand,
    deleteBrand,
    updateBrand,
    createBrand,
  };
};
