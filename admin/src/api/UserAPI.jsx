import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const UserAPI = () => {
  const { backendUrl } = useContext(ShopContext);

  const resource = "/api/admin";

  const getAllUsers = async () => {
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

  const adminLogin = async (data) => {
    try {
      const res = await axios.post(
        backendUrl + resource + "/admin-login",
        data
      );
      return res.data;
    } catch (error) {
      toast.error("Failed: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const createUser = async (data) => {
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

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(backendUrl + resource + "/" + id);
      return res.data;
    } catch {
      toast.error("Failed to delete Brand: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const updateInfo = async ({ id, data }) => {
    const res = await axios.put(backendUrl + resource + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };
  return {
    getAllUsers,
    deleteUser,
    updateInfo,
    createUser,
    adminLogin,
  };
};
