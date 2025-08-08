import { createContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (token === "") {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", token);
  }, [token]);

  const value = {
    token,
    setToken,
    loading,
    setLoading,
    backendUrl,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
