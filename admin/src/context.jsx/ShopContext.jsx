import { createContext } from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const dd = 144;
  const value = {
    dd,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
