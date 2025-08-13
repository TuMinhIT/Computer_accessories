import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../component/Footer";
import { assets } from "../assets/assets";

import { ShopContext } from "../context/ShopContext";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = email.split("@")[0];

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });

      const { token, role } = res.data;

      if (role === "admin") {
        localStorage.setItem("adminToken", token);
        navigate("/dashboard");
      } else if (role === "staff") {
        localStorage.setItem("staffToken", token);
        navigate("/staff-home");
      }
    } catch (error) {
      const msg = error.response?.data?.message;
      if (msg === "Please change password before accessing system") {
        localStorage.setItem("pendingUsername", username);
        navigate("/change-password");
      } else {
        alert(msg || "Login failed");
      }
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${assets.loginBg})` }}
      >
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Login Admin
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
