import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Routers from "./routers/routers";
import { useEffect } from "react";
import Chat from "./components/Chat";
import { useLocation } from "react-router";
function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header />
        <Chat />

        <Routers />
        <Footer />
      </div>
    </>
  );
}

export default App;
