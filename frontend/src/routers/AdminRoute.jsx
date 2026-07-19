import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const AdminRoute = () => {
  const { user } = useContext(ShopContext);

  // if (user === null) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (user?.role !== "admin") {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default AdminRoute;