import { assets } from "../../assets/assets";
const Banner = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-600 max-h-130  mt-10">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className=" text-gray-900">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11  h-[2px] bg-[#414141]"></p>
            <p className=" font-medium text-sm md:text-base">
              Power Your Passion. Upgrade Your World
            </p>
          </div>

          <h1 className="font-extralight text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Lastest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-full h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <img
        src={assets.background1}
        className="w-full overflow-hidden  sm:w-1/2"
        alt=""
      />
    </div>
  );
};

export default Banner;
