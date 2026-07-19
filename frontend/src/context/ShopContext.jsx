import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const navigate = useNavigate();


  useEffect(() => {
    if (accessToken === "" || refreshToken === "") {
      logout()
    }
  }, [accessToken, refreshToken]);



  const logout = () => {
    setToken("");
    setRole("");
    setAccessToken("");
    setRefreshToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  const setLoginToken = async (accessToken, refreshToken, user) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setToken(accessToken);
    setUser(user);
    setRole(user.role);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", user.role);
    localStorage.setItem("user", JSON.stringify(user));
  };


  const value = {
    token, accessToken, refreshToken,
    logout, setLoginToken,
    role, setRole,
    user,
    navigate
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
