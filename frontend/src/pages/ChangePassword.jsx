import { useContext } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserService } from "../services/UserService";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { motion } from "framer-motion";
function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { navigate } = useContext(ShopContext);
  const location = useLocation();
  const { username } = location.state || {};

  const { changePassword } = UserService();
  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
  });
  useEffect(() => {
    if (!username) {
      toast.error("No user found, please login again.");
      navigate("/login");
      return;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    mutate({ username, newPassword });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-200 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zJTIwc3lzdGVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>

      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden  m-6  flex flex-col lg:flex-row border border-indigo-100/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg  max-w-300">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
            Change Password
          </h2>
          {isPending && <Spinner />}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ChangePassword;
