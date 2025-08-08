import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Routers from "../routers";
import { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { ShopContext } from "../context/ShopContext";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // {
  //   loading && (
  //     <div className=" bg-black/30 z-30 fixed w-full h-full inset-0 flex items-center justify-center">
  //       <ClipLoader color="#3b82f6" loading={true} size={50} />
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      <Header toggleSidebar={toggleSidebar} />
      <ToastContainer />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r border-blue-100 shadow-lg rounded-r-2xl">
          <Sidebar />
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-10 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative w-64 ">
              <Sidebar toggleSidebar={toggleSidebar} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 bg-gray-100">
          <div className="flex-1 flex flex-col px-20 py-4 ">
            <Routers />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
