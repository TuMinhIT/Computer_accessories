import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Routers from "./routers";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";

function App() {
  const { token } = useContext(ShopContext);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {token != "" && <Header />}
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
        />
        <Routers />
        <Footer />
      </div>
    </>
  );
}

export default App;
