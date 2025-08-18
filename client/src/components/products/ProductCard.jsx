import ProductCarousel from "./ProductCarousel";
import { Link } from "react-router";

const ProductCard = ({ item }) => {
  const currency = "$";
  return (
    <div>
      <div className="w-full bg-white border border-gray-200 rounded-lg hover:scale-105 hover:shadow-lg transition duration-300 ">
        <ProductCarousel key={item._id} item={item} />
        <div className="px-5 pb-2 bg-gray-100 flex flex-col gap-4">
          <Link to={`products/${item._id}`}>
            <p className="h-12 line-clamp-3 text-base font-semibold text-gray-900 hover:text-blue-900">
              {item.name}
            </p>
          </Link>

          <div className="">
            <span className="justify-start flex font-bold text-blue-700">
              {currency}
              {item.price}
            </span>
          </div>
          <div className="flex-row flex justify-around items-center ">
            <button className="hover:scale-105 hover:border border-gray-900 bg-blue-500 flex justify-center text-white rounded w-18  px-2">
              Order
            </button>
            <button className="flex justify-center text-white rounded w-18 hover:scale-105 hover:border border-gray-900 bg-orange-600 px-2">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
