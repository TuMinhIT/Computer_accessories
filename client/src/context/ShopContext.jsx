import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [token, setToken] = useState("ss");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_API_URL;

  const value = {
    token,
    setToken,
    navigate,
    backendUrl,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
