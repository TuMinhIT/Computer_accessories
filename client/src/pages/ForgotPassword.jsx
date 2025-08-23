import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { assets } from "../assets/assets";
import { UserService } from "../services/UserService";
import Spinner from "../components/Spinner";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { forgotPassword, resetPassword } = UserService();
  const [timeLeft, setTimeLeft] = useState(0);
  // đếm ngược
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Check your email for OTP!");
        setOtpToken(res.data);
      } else {
        toast.error(res.data.message);
      }
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({ email });
    setTimeLeft(60);
  };

  const { mutate: confirmOtp, isPending: loadOtp } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (res) => {
      console.log("tokenotp" + res.data);
    },
  });
  const handleChange = async (e) => {
    e.preventDefault();
    confirmOtp({ otpToken, otp, newPassword });
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
        {!otpToken && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg  space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
            {isPending && <Spinner />}

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
              Send OTP code
            </button>

            <Link to={"/login"} className="flex hover:text-blue-500">
              <img src={assets.chevron_left} alt="" />
              Back to Login
            </Link>
          </form>
        )}
        {otpToken && (
          <form
            onSubmit={handleChange}
            className="bg-white p-8 w-100 rounded-lg shadow-lg  space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
            {loadOtp && <Spinner />}

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-30 mx-2 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-300"
              >
                Confirm
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className={`w-30 py-2 rounded-lg text-white ${
                  timeLeft > 1
                    ? "bg-gray-400 cursor-not-allowed w-40"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                {timeLeft
                  ? `Resend OTP in ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`
                  : "Resend OTP"}
              </button>
            </div>

            <Link to={"/login"} className="flex hover:text-blue-500">
              <img src={assets.chevron_left} alt="" />
              Back to Login
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
