import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ClipLoader from "react-spinners/ClipLoader";

const CustomLoader = () => {
  const { loading } = useContext(ShopContext);
  return (
    loading && (
      <div className=" bg-black/30 z-30 fixed w-full h-full inset-0 flex items-center justify-center">
        <ClipLoader color="#3b82f6" loading={true} size={50} />
      </div>
    )
  );
};

export default CustomLoader;
