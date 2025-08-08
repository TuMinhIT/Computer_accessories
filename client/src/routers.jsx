import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PosPage from './pages/PosPage';
import ViewCustomer from './pages/ViewCustomer';
import CheckoutCustomerForm from "./components/CheckoutCustomerForm";
import CheckoutPage from "./components/CheckoutPage";
import CustomerHistory from "./components/CustomerHistory";
const Routers = () => {
  return (
    <>
      <main className="flex-grow bg-gray-50">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<CheckoutPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/view-customer" element={<ViewCustomer />} />
          {/* <Route path="/pos" element={<PosPage />} /> */}
        </Routes>
      </main>
    </>
  );
};

export default Routers;
