import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { username, password, remember });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-200 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zJTIwc3lzdGVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      ></motion.div>

      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-6 flex flex-col lg:flex-row border border-indigo-100/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
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
              <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">POS System</h2>
              <p className="text-white text-xl opacity-95 leading-relaxed max-w-md mx-auto">
                Empower your phone retail store with secure, efficient management: barcode scanning, real-time reports, and seamless transactions.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:w-1/2 p-12 md:p-20">
          <motion.h1
            className="text-4xl font-extrabold text-indigo-700 mb-10 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Login to Your Account
          </motion.h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <label htmlFor="username" className="block text-base font-medium text-gray-800 mb-3">
                Username (Email prefix)
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm text-lg"
                placeholder="e.g., admin (from admin@gmail.com)"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label htmlFor="password" className="block text-base font-medium text-gray-800 mb-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 shadow-sm text-lg"
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-3 text-base text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-base text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300"
              whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(79,70,229,0.4)' }}
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
            New employee? <a href="#" className="text-indigo-600 hover:underline font-medium">Contact Admin for Account</a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;