import { assets } from "../assets/assets";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Form Section */}
            <div className="flex-1 p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-gray-600">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href="../pages/sign-up.html"
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <img
                  className="rounded-2xl w-full max-w-md mx-auto shadow-2xl mb-6"
                  src={assets.background1}
                  alt="Login illustration"
                />
                <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                <p className="text-blue-100 text-lg">
                  Access your dashboard and manage your account with ease
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
