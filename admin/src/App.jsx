import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-staff" element={<CreateStaff />} />
        <Route path="/staff-home" element={<StaffHomepage />} /> */}
      <Route path="/*" element={<DashboardLayout />} />
    </Routes>
  );
}
