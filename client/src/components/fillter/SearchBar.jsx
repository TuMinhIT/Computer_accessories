import { useState } from "react";
import { assets } from "../../assets/assets";
import CategoryFillter from "./CategoryFillter";
import { toast } from "react-toastify";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    if (search.trim().length > 0) {
      toast.success("Click cm bạn!");
    } else {
      toast.error("Gay lord!");
    }
  };
  return (
    <>
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border border-gray-400 px-4 py-3">
        <div className="flex flex-row items-center justify-around px-15 py-5">
          <CategoryFillter />
          <div className="flex items-center justify-center border border-gray-700  rounded-full w-2/3 sm:w-1/3">
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
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-black  bg-amber-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
          >
            filter price{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
