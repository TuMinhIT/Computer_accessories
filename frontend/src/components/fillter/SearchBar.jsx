import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
const SearchBar = ({ products, setFilteredProducts }) => {
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.barcode.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (search.trim() !== "") {
      handleSearch();
    } else setFilteredProducts(products);
  }, [search, products]);

  return (
    <>
      <div className=" flex items-center w-full hover:border-blue-700 justify-center border border-gray-700  rounded-full  sm:w-1/3">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-base  outline-none  px-5 py-2"
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
    </>
  );
};

export default SearchBar;
