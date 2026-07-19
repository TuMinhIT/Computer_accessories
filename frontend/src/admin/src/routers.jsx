import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import OverView from "./pages/OverView";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
import Inbox from "./pages/Inbox";
import Customers from "./pages/Customers";
import CategoriesAndBrand from "./pages/CategoriesAndBrand";
import ProfileManager from "./pages/ProfileManager";
import NotFound from "./pages/NotFound";
import ChatAdminPage from "./pages/ChatAdminPage";
const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<OverView />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inbox" element={<ChatAdminPage />} />
        <Route path="/categories" element={<CategoriesAndBrand />} />
        <Route path="/profile" element={<ProfileManager />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admin/chat" element={<ChatAdminPage />} />

      </Routes>
    </>
  );
};

export default Routers;
