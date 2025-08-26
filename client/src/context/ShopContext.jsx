import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;
  const currency = "$";
  useEffect(() => {
    if (token === "") {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    token,
    setToken,
    navigate,
    backendUrl,
    currency,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
