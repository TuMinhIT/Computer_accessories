import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Product from "./pages/Product";
import { ToastContainer } from "react-toastify";
import ProductList from './components/ProductList';
function App() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <Header />
    //   <ToastContainer
    //     position="top-right"
    //     autoClose={2000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //   />
    //   <main className="flex-grow bg-gray-50">
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/contact" element={<Contact />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/product" element={<Product />} />
    //     </Routes>
    //   </main>
    //   <Footer />
    // </div>

    <div>
      <h1>Quản lý Sản phẩm</h1>
      <ProductList />
    </div>
  );
}

export default App;
