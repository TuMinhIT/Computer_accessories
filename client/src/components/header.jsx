import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import HeaderDropdown from "./HeaderDropdown";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(assets.user_img);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setAvatarUrl(assets.user_img);
          return;
        }
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success) {
          const url = res.data.data?.avatar;
          setAvatarUrl(url && url.length > 0 ? url : assets.user_img);
        } else {
          setAvatarUrl(assets.user_img);
        }
      } catch (err) {
        setAvatarUrl(assets.user_img);
      }
    };

    fetchAvatar();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="bg-indigo-500 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 w-auto object-contain"
                src={assets.logo}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* sales */}
            <Link
              to="/sales"
              className="p-2 hover:bg-indigo-600 rounded-full transition-colors duration-200 relative"
            >
              <img className="w-6 h-6" src={assets.sell} alt="Sell" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 hover:bg-indigo-600 rounded-full transition-colors duration-200 relative"
            >
              <img className="w-6 h-6" src={assets.shopping_cart} alt="Cart" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-1 hover:bg-indigo-600 rounded-full transition-colors duration-200"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover border-2 border-transparent hover:border-white"
                  src={avatarUrl}
                  alt="User"
                />
              </button>
              {showDropdown && <HeaderDropdown />}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-indigo-600 rounded-lg transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMobileMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-indigo-400">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="/about"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
