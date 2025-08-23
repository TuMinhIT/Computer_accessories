import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
export const UserService = () => {
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);

  const resource = "/api/users/";

  const login = async ({ username, password }) => {
    try {
      const res = await axios.post(backendUrl + resource + "login", {
        username,
        password,
      });

      if (res.data.success) {
        if (res.data.forceChangePassword) {
          toast.warning(
            "You must change your password before using the system"
          );

          navigate("/change-password", {
            state: { username: username },
          });
        } else {
          setToken(res.data.token);
          navigate("/");
        }
        return res.data;
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const changePassword = async ({ username, newPassword }) => {
    try {
      const res = await axios.post(backendUrl + resource + `change-password`, {
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
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const forgotPassword = async ({ email }) => {
    try {
      const res = await axios.post(backendUrl + resource + "forgot-password", {
        email,
      });

      return res.data;
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const resetPassword = async ({ otpToken, otp, newPassword }) => {
    try {
      const res = await axios.post(backendUrl + resource + "reset-password", {
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
      toast.error(err.message);
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

  const updateInfo = async ({ id, data }) => {
    const res = await axios.put(backendUrl + resource + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  };
  return {
    updateInfo,
    login,
    changePassword,
    adminProfile,
    forgotPassword,
    resetPassword,
  };
};
