import { useContext } from "react";
import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const { currency } = useContext(ShopContext);
  const handleAdd = (e) => {
    e.preventDefault();
    toast.success("add success!");
  };
  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg transition duration-300 ">
        <ProductCarousel key={item._id} item={item} />
        <div className="px-5 pb-2 bg-gray-100 flex flex-col gap-4">
          <p className="h-12 cursor-pointer line-clamp-3 text-base font-semibold text-gray-900 hover:text-blue-900">
            {item.name}
          </p>

          <div className="flex-row flex justify-between items-center ">
            <span className="justify-start flex font-bold text-blue-700">
              {currency}
              {item.price}
            </span>
          </div>
        </div>
        <div
          onClick={handleAdd}
          className="bg-blue-700 cursor-pointer py-2 hover:bg-blue-800 w-full justify-center items-center text-white font-bold text-center flex"
        >
          <p className="pr-2">Add</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
