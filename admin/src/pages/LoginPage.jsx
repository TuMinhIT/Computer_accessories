import { useContext, useState } from "react";

import Footer from "../component/Footer";
import { assets } from "../assets/assets";
import { UserHooks } from "../hooks/userHoocks";
import { ShopContext } from "../context/ShopContext";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../component/Spinner";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setToken } = useContext(ShopContext);

  const { useLogin } = UserHooks();
  const { mutate, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(
      { username, password },
      {
        onSuccess: (res) => {
          if (res.success) {
            setToken(res.token);
          } else {
            toast.error(res.message);
          }
        },
      }
    );
  };

  return (
    <>
      <ToastContainer />
      {isPending && <Spinner />}
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
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
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

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
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
