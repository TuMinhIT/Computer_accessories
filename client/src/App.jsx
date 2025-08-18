import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import Routers from "./routers";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";

function App() {
  const { token } = useContext(ShopContext);
  return (
    <>
      {token != "" ? (
        <div className="flex flex-col min-h-screen">
          <Header />
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
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
