
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChangePassword from "./pages/ChangePassword";
import CreateStaff from "./pages/CreateStaff";
import StaffHomepage from "./pages/StaffHomepage";
import DashboardLayout from "./pages/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-staff" element={<CreateStaff />} />
        <Route path="/staff-home" element={<StaffHomepage />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

