import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 px-10 py-5">
        <div className="px-6 py-8 flex  md:flex-row justify-around">
          {/* //logo */}
          <div className="flex flex-col items-center ">
            <Link className="overflow-hidden h-10" to={"/"}>
              <img className="w-full h-full" src={assets.logo} alt="" />
            </Link>

            <p className="max-w-md mx-auto mt-4 text-gray-500 dark:text-gray-400">
              Pro web site built by secret team
            </p>

            <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
              <button className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Get started
              </button>
            </div>
          </div>
          {/* //about */}
          <div className="flex flex-col text-gray-200">
            <h5 className="text-xl font-bold mb-6">About</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Team
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Locations
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Privacy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col text-gray-200">
            <h5 className="text-xl font-bold mb-6">Help</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Support
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-5 border-gray-200 dark:border-gray-700" />
        <div className="flex flex-row justify-between p-3">
          <p className="text-sm text-gray-500">
            © Copyright 2025. All Rights Reserved.
          </p>

          <div className="space-x-6">
            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Teams{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Privacy{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Cookies{" "}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
