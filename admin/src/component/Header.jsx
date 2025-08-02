import { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Header = ({ toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log(search);
  };
  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-md border border-gray-400 px-4 ">
        <div className="flex flex-row items-center justify-between px-5 lg:px-15 py-5">
          <div className="block lg:hidden">
            <button onClick={toggleSidebar} className="p-2">
              <img className="w-5 h-5" src={assets.density_medium} alt="Menu" />
            </button>
          </div>
          <div className="hidden items-center flex-row lg:flex space-x-4">
            <img className="w-25" src={assets.logo} alt="" />
            <h1 className="text-3xl font-bold text-blue-700 ml-20">
              DASHBOARD
            </h1>
          </div>

          <div className="w-3/4 lg:w-1/2 flex flex-row justify-between ">
            <div className="flex w-1/2 min-w-96 items-center justify-center border border-gray-700  rounded-full ">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-base  outline-none bg-inherit  px-5 py-2"
                type="text"
                placeholder="Search"
                value={search}
              />

              {search && (
                <img
                  onClick={() => setSearch("")}
                  className="inline w-4 cursor-pointer mx-2 hover:scale-120"
                  src={assets.close}
                  alt=""
                />
              )}

              <div className="items-center bg-blue-600 rounded-r-full border-gray-700 hover:bg-blue-800  h-full py-2 w-12">
                <img
                  onClick={handleSearch}
                  className="w-6 m-auto hover:scale-105 "
                  src={assets.search}
                  alt=""
                />
              </div>
            </div>
            <div className=" flex flex-row items-center ">
              <img className="w-5 h-5 mx-5" src={assets.sell} alt="" />
              <Link to={"/profile"}>
                <img className="w-10 h-10 " src={assets.user_img} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
