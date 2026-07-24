import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { httpClient } from "./httpClient";

export const ProductService = () => {
  const resource = "/api/products"

  const getAllProducts = async () => {
    try {
      const res = await httpClient.get(resource);
      if (res.data.success) {
        return res.data.data;
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Failed to fetch products: " + (err.message || ""));
      console.error(err);
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



  const createProduct = async (data) => {
    try {

      console.log("goinj rôig")
      const res = await httpClient.post(resource, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      toast.error("Failed to create product: " + (err.message || ""));
      console.error(err);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await httpClient.put(resource + "/" + id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        return res.data.data;
      }
    } catch (err) {
      toast.error("Failed to update product: " + (err.message || ""));
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await httpClient.delete(resource + "/" + id);
      return res.data;
    } catch (err) {
      toast.error("Failed to delete product: " + (err.message || ""));
      console.error(err);
    }
  };

  return { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct };
};

export default ProductService;