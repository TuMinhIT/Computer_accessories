import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { httpClient } from "./httpClient"

export const UserService = () => {
  const { setToken, navigate } = useContext(ShopContext);

  const resource = "/api/users/";

  const register = async ({ username, password }) => {
    try {
      const res = await httpClient.post(resource + "register", {
        username,
        password,
      });

      if (res.data.success) {
        toast.success("Registration successful!");
        navigate("/login");
        return res.data;
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const login = async ({ username, password }) => {
    try {
      const res = await httpClient.post(resource + "login", {
        email: username,
        password,
      });

      if (res.data.success) {
        return res.data;
      } else {
        toast.error(res.data.message || "Login failed");
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return error;
    }
  };

  const changePassword = async ({ username, newPassword }) => {
    try {
      const res = await httpClient.post(resource + `change-password`, {
        username,
        newPassword,
      });

      if (res.data.success) {
        toast.success(
          "Password change successfully, now login with new password!"
        );
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const forgotPassword = async ({ email }) => {
    try {
      const res = await httpClient.post(resource + "forgot-password", {
        email,
      });

      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const resetPassword = async ({ otpToken, otp, newPassword }) => {
    try {
      const res = await httpClient.post(resource + "reset-password", {
        otpToken,
        otp,
        newPassword,
      });
      if (res.data.success) {
        toast.success(
          "Change password successfully, now login with new password!"
        );
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const adminProfile = async () => {
    try {
      const res = await httpClient.get(resource + "profile");
      if (!res.data.success) {
        setToken("");
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const updateInfo = async ({ id, data }) => {
    const res = await httpClient.put(resource + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };

  const getAllUsers = async () => {
    try {
      const res = await httpClient.get(resource);
      return res.data.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteUser = async (id) => {
    const res = await httpClient.delete(resource + id);
    return res.data;
  };

  return {
    updateInfo,
    getAllUsers,
    deleteUser,
    login,
    changePassword,
    adminProfile,
    forgotPassword,
    resetPassword,
    register
  };
};
export default UserService;
