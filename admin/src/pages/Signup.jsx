import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${assets.loginBg})` }}
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Đăng ký
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Đăng kí
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoảng?
          <Link
            to={"/login"}
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Đăng nhập
          </Link>
        </div>

        <div className="flex flex-col mt-10 gap-4">
          <div className="flex justify-center flex-row gap-2 items-center">
            <hr className="w-20" />
            <span className="text-gray-700 font-bold">hoặc</span>
            <hr className="w-20" />
          </div>

          <div className=" justify-center flex flex-row items-center cursor-pointer hover:bg-gray-100   w-full px-4 py-2 border border-gray-500 rounded-lg ">
            <img className="w-5 h-5 mr-5" src={assets.google} alt="" />
            Đăng nhập với google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
