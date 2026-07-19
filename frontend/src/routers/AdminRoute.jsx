import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const AdminRoute = () => {
  const { token } = useContext(ShopContext);

  if (!token || token.trim() === "") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // render tất cả route con bên trong
};

export default AdminRoute;
