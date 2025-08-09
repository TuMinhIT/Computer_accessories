import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PosPage from "./pages/PosPage";
import ViewCustomer from "./pages/ViewCustomer";
// import CheckoutCustomerForm from "./components/CheckoutCustomerForm";
import CheckoutPage from "./pages/CheckoutPage";
import ReportPage from "./pages/ReportPage";
// import CustomerHistory from "./components/CustomerHistory";
// import Transaction from "./pages/transaction";
const Routers = () => {
  return (
    <>
      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Transaction />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sales" element={<ReportPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/view-customer" element={<ViewCustomer />} />
          {/* <Route path="/pos" element={</>} /> */}
        </Routes>
      </main>
    </>
  );
};

export default Routers;

// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import PosPage from "./pages/PosPage";
// import ReportPage from "./pages/ReportPage";

// const Routers = () => {
//   return (
//     <Routes>
//       <Route path="/pos" element={<PosPage />} />
//       <Route path="/report" element={<ReportPage />} />
//     </Routes>
//   );
// };

// export default Routers;
