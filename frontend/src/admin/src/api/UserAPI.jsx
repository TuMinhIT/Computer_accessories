import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

export const UserAPI = () => {
  const { backendUrl, token, setToken } = useContext(ShopContext);
  const resource = "/api/admin/";

  const getAllUsers = async () => {
    try {
      const res = await axios.get(backendUrl + resource + "users", {
        headers: {
          token: token,
        },
      });
      if (!res.data.success) {
        if (res.data.message === "Unauthorized") {
          setToken("");
          return [];
        }
        throw new Error(res.data.message || "Unknown error");
      }

      return res.data.data;
    } catch (err) {
      toast.error("Failed to fetch data: " + (err.message || ""));
      throw err;
    }
  };

  const adminLogin = async (data) => {
    try {
      const res = await axios.post(backendUrl + resource + "admin-login", data);
      return res.data;
    } catch (error) {
      toast.error("Failed: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const adminProfile = async () => {
    try {
      const res = await axios.post(
        backendUrl + resource + "/adminProfile",
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(res.data);
      if (!res.data.success) {
        setToken("");
      }
      return res.data;
    } catch (error) {
      toast.error("Failed: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const createUser = async ({ data }) => {
    try {
      const res = await axios.post(backendUrl + resource + "users", data, {
        headers: {
          token,
        },
      });
      return res.data;
    } catch (error) {
      toast.error("Failed to add Brand: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const deleteUser = async ({ id }) => {
    try {
      const res = await axios.delete(backendUrl + resource + "users/" + id);
      return res.data;
    } catch {
      toast.error("Failed to delete User: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  const blockUser = async ({ id }) => {
    try {
      const res = await axios.put(
        backendUrl + resource + "users/" + id + "/toggle-block",
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      toast.error("Block/Unblock failed");
    }
  };

  const updateUser = async ({ data }) => {
    try {
      const res = await axios.put(
        backendUrl + resource + "users/" + data._id,
        data,
        {
          headers: {
            token: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resendActivation = async ({ data }) => {
    try {
      const res = await axios.post(
        backendUrl + resource + "users/resend-activation",
        { email: data },
        {
          headers: {
            token,
          },
        }
      );
      return res.data;
    } catch (error) {
      toast.error("Failed to add Brand: " + (err.message || ""));
      console.error(err);
      throw err;
    }
  };

  return {
    resendActivation,
    getAllUsers,
    deleteUser,
    updateUser,
    createUser,
    adminLogin,
    adminProfile,
    blockUser,
  };
};
