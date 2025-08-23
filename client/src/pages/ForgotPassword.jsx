import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { assets } from "../assets/assets";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/employees/forgot-password",
        { email }
      );
      if (res.data.success) {
        toast.success("Check your email for reset link!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
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
        className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden   border border-indigo-100/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg  space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Send Reset Link
          </button>
          <Link to={"/login"} className="flex hover:text-blue-500">
            <img src={assets.chevron_left} alt="" />
            Back to Login
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
