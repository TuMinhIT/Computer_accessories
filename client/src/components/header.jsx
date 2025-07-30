import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import HeaderDropdown from "./HeaderDropdown";
import { useEffect, useRef, useState } from "react";
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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
    <div>
      <header className=" items-center px-0 md:px-20 sm:px-2 flex flex-row bg-indigo-500 text-white text-lg py-2 shadow-md justify-between ">
        <div className="flex h-15 overflow-hidden ">
          <img
            className="object-cover h-full w-full  "
            src={assets.logo}
            alt=""
          />
        </div>

        <div className="flex">
          <nav className="space-x-8">
            <Link
              to="/"
              className=" hover:border  hover:bg-indigo-600 rounded-3xl py-2 px-4 "
            >
              Home
            </Link>
            <Link
              to="/product"
              className=" hover:border  hover:bg-indigo-600 rounded-3xl py-2 px-4 "
            >
              Collection
            </Link>
            <Link
              to="/about"
              className=" hover:border  hover:bg-indigo-600 rounded-3xl py-2 px-4 "
            >
              About
            </Link>
            <Link
              to="/contact"
              className=" hover:border  hover:bg-indigo-600 rounded-3xl py-2 px-4 "
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex">
          <div className="p-2 mr-5">
            <img className="w-8  h-8" src={assets.shopping_cart} alt="" />
          </div>
          <div className="p-2  mr-5 relative " ref={dropdownRef}>
            <img
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 rounded-full  h-10"
              src={assets.user_img}
              alt=""
            />
            {showDropdown && <HeaderDropdown />}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
