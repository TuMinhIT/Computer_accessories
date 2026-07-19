import { motion } from "framer-motion";

import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-200 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zJTIwc3lzdGVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      ></motion.div>

      <motion.div
        className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-2/3 m-6 lg:w-full flex flex-col lg:flex-row border border-indigo-100/50"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}

export default Login;
