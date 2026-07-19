import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/UserService";
import Spinner from "./Spinner";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = UserService();

  const useLogin = useMutation({
    mutationFn: login,
    onSuccess: (res) => {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    useLogin.mutate({ username, password });
  };

  return (
    <>
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://lapvip.vn/upload/products/thumb_800x0/httpslaptopworldvnmediaproduct250-21170-asus-vivobook-s-14-q423-5jpg-1743062681.jpg"
          alt="Modern phone retail store with POS system"
          className="object-cover w-full h-full brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-indigo-500/40 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              POS System
            </h2>
            <p className="text-white text-xl opacity-95 leading-relaxed max-w-md mx-auto">
              Empower your phone retail store with secure, efficient management:
              barcode scanning, real-time reports, and seamless transactions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className=" lg:w-1/2 p-12 md:p-20">
        <motion.h1
          className="text-4xl font-extrabold text-indigo-700 mb-10 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Login to Your Account
        </motion.h1>

        {useLogin.isPending && <Spinner />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label
              htmlFor="username"
              className="block text-base font-medium text-gray-800 mb-3"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm text-lg"
              placeholder="Enter your username "
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-800 mb-3"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6  py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm text-lg"
              placeholder="Enter your password"
              required
            />
          </motion.div>
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="hidden items-center">
              <input
                type="checkbox"
                id="remember"
                className=" w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-3 text-base text-gray-700"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-base text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </motion.div>
          <motion.button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold text-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 6px 20px rgba(79,70,229,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Login
          </motion.button>
        </form>
        <motion.p
          className="mt-8 text-center text-base text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          New employee?{" "}
          <Link className="text-indigo-600 hover:underline font-medium">
            Contact Admin for Account
          </Link>
        </motion.p>
      </div>
    </>
  );
};

export default LoginForm;
