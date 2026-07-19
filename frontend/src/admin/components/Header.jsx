
import { assets } from "../../../src/assets/assets";
import { Link } from "react-router-dom";
const Header = ({ toggleSidebar }) => {
  return (
    <>
      <div className="sticky w-full top-0  z-10 backdrop-blur-md border border-gray-400 px-4 ">
        <div className="flex flex-row items-center justify-between px-5 lg:px-15 py-5">
          <div className="block lg:hidden">
            <button onClick={toggleSidebar} className="p-2">
              <img className="w-5 h-5" src={assets.density_medium} alt="Menu" />
            </button>
          </div>
          <div className="hidden items-center flex-row md:flex space-x-4">
            <img className="w-25" src={assets.logo} alt="" />
            <h1 className="text-3xl font-bold text-blue-700 ml-20">
              DASHBOARD
            </h1>
          </div>

          <div className=" flex flex-row justify-between ">
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
