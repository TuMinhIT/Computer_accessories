import { useState } from "react";
import ActionButton from "./ActionButton";
import { assets } from "../../assets/assets";

import Spinner from "../Spinner";
import { productHooks } from "../../hooks/productHooks";
import { toast } from "react-toastify";
import EditProduct from "./EditProduct";
const ProductLine = ({ product }) => {
  const [index, setIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const maxLength = product.images.length;
  const handleClick = () => {
    setIndex((prev) => (prev + 1) % maxLength);
  };
  const { useDeleteProduct } = productHooks();
  const { mutate, isPending } = useDeleteProduct();

  const handleDelete = () => {
    mutate(product._id, {
      onSuccess: () => {
        toast.success("Product deleted!");
      },
    });
  };

  return (
    <>
      {showEditModal && (
        <EditProduct product={product} setShowEditModal={setShowEditModal} />
      )}

      <div className=" bg-white border border-gray-200 rounded-xl shadow-sm w-full group hover:shadow-lg hover:border-gray-400 transition-all duration-200  mb-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-4 items-center px-2 sm:px-4 py-3">
          {/* Image */}
          <div className="relative col-span-1 flex justify-center min-w-0">
            <div className="w-24 h-24 sm:w-24 sm:h-18 md:w-30 md:h-20 rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center transition-all duration-200">
              <img
                src={product.images[index]}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <img
              onClick={handleClick}
              className="absolute right-1 top-1 w-5 h-5  hover:bg-amber-200 rounded-2xl bg-white bg-opacity-80 shadow"
              src={assets.chevron_right}
              alt=""
            />
          </div>
          {/* Name & Code */}
          <div className="col-span-1 sm:col-span-2 min-w-0">
            <div
              className="font-semibold text-gray-900 break-words whitespace-normal text-sm sm:text-base"
              style={{ wordBreak: "break-word" }}
            >
              {product.name}
            </div>
            <div className="text-xs text-gray-500 break-all">
              Code: <span className="font-mono">{product.barcode}</span>
            </div>
          </div>
          {/* Category & Brand */}
          <div className="col-span-2 min-w-0">
            <div className="text-sm text-gray-700 font-medium truncate">
              {product.category?.name}
            </div>
            <div className="text-xs flex text-black">
              Brand: <p className="ml-1 font-bold"> {product.brand.name}</p>
            </div>
          </div>
          {/* Price & Cost */}
          <div className="col-span-2">
            <div className="text-sm text-blue-700 font-bold">
              Price: <span className="font-mono">{product.price}</span>
            </div>
            <div className="text-xs text-gray-500">
              Cost: <span className="font-mono">{product.cost}</span>
            </div>
          </div>
          {/* Stock & Warranty */}
          <div className="col-span-1">
            <div className="text-sm font-medium text-gray-900">
              Stock: <span className="font-mono">{product.stock}</span>
            </div>
            <div className="text-xs text-gray-500">
              Warranty: {product.warrantyMonths}
            </div>
          </div>
          {/* Bestseller & CreatedAt */}
          <div className="col-span-2 flex flex-col gap-1">
            {product.bestseller && (
              <label className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={product.bestseller}
                  readOnly
                  className="accent-amber-500 w-4 h-4 rounded border-none"
                />
                Bestseller
              </label>
            )}

            <div className="text-xs text-gray-500">
              Created: {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>
          {isPending && <Spinner />}
          {/* Actions */}
          <div className="col-span-2 flex justify-end">
            <ActionButton
              handleDelete={handleDelete}
              setShowEditModal={setShowEditModal}
            />
          </div>
        </div>
        <div className="hidden group-hover:block text-left overflow-x-auto bg-blue-400 p-3 rounded-b-xl border-t border-gray-400 transition-all duration-200">
          <div className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductLine;
