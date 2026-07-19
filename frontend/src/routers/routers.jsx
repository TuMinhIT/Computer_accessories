import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";

import Products from "../pages/Products";
import Cart from "../pages/Cart";
import PosPage from "../pages/PosPage";
import ViewCustomer from "../pages/ViewCustomer";
// import CheckoutCustomerForm from "./components/CheckoutCustomerForm";
import CheckoutPage from "../pages/CheckoutPage";
import ReportPage from "../pages/ReportPage";
import Transaction from "../pages/transaction";
import ProfileManager from "../pages/ProfileManager";
import ChangePassword from "../pages/ChangePassword";
// import CustomerHistory from "./components/CustomerHistory";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import ChatPage from "../pages/ChatPage";
import RegisterForm from "../components/auth/RegisterForm";
const Routers = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <Routes>
        {/* Public */}
        <Route path="/*" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />

        {/* Private wrapper */}
        <Route element={<PrivateRoute />}>
          <Route path="/tran" element={<Transaction />} />
          <Route path="/sales" element={<ReportPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/view-customer" element={<ViewCustomer />} />
          <Route path="/pos" element={<PosPage />} />
          <Route path="/profile" element={<ProfileManager />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default Routers;
