import Sidebar from "../component/Sidebar";
import Footer from "../component/Footer";
import Header from "../component/Header";
import Routers from "../routers";
import { useState } from "react";
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex">
        {/* desktop */}
        <div className="hidden lg:block w-64  shadow-lg border-r border-gray-200 ">
          <Sidebar />
        </div>
        {/* mobi */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div onClick={() => setSidebarOpen(false)}>
              <Sidebar />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full bg-gray-100">
          <div className="flex flex-col my-5 mx-5 md:mx-10 lg:mx-20">
            <Routers />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
