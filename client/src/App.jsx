import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import ProductList from "./components/ProductList";
import { ShopContext } from "./context.jsx/ShopContext";
import { useContext } from "react";
import Routers from "./routers";
function App() {
  const { dd } = useContext(ShopContext);
  console.log(dd);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <Header />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}

        <Routers />

        {/* <Footer /> */}
      </div>

      <div>
        <h1>Quản lý Sản phẩm</h1>

        {/* {/* <ProductList /> */}
        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;
