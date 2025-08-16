import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { ShopContext } from "./context/ShopContext";
export default function App() {
  const { token } = useContext(ShopContext);
  return (
    <Routes>
      {token === "" || !token ? (
        <Route path="/login" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<DashboardLayout />} />
      )}
      {/* <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-staff" element={<CreateStaff />} />
        <Route path="/staff-home" element={<StaffHomepage />} /> */}

      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
