import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();


  useEffect(() => {
    if (token === "" || refreshToken === "") {
      logout()
    }
  }, [token, accessToken, refreshToken]);



  const logout = () => {
    setToken("");
    setRole("");
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const setLoginToken = async (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setToken(accessToken);
  };


  const value = {
    token, accessToken, refreshToken,
    logout, setLoginToken,
    role, setRole,
    navigate
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
