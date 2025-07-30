import { useState } from "react";
import { assets } from "../../assets/assets";
const ProductCarousel = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div>
      <div
        id="controls-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        {/* <!-- Carousel wrapper --> */}
        <div className="relative h-46 mx-5 rounded-lg overflow-hidden  md:h-50  ">
          <div className=" ease-in-out " data-carousel-item>
            <img
              src={item.image[currentIndex]}
              className=" absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-105 "
              alt="..."
            />
          </div>
        </div>

        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full  cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <img
            onClick={() =>
              setCurrentIndex(
                currentIndex > 0 ? currentIndex - 1 : item.image.length - 1
              )
            }
            className="hover:scale-150 hover:border rounded-3xl text-gray-500"
            src={assets.chevron_left}
            alt=""
          />
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full  cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span>
            <img
              onClick={() =>
                setCurrentIndex(
                  currentIndex < item.image.length - 1 ? currentIndex + 1 : 0
                )
              }
              className="hover:scale-150 hover:border rounded-3xl text-gray-500"
              src={assets.chevron_right}
              alt=""
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
