import { Route, Routes } from "react-router-dom";

import Products from "./pages/Products";
import OverView from "./pages/OverView";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
import Inbox from "./pages/Inbox";
import ProfilePage from "./pages/ProfilePage";
import Customers from "./pages/Customers";
import LoginPage from "./pages/LoginPage";
import CategoriesAndBrand from "./pages/CategoriesAndBrand";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<OverView />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/categories" element={<CategoriesAndBrand />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </>
  );
};

export default Routers;
