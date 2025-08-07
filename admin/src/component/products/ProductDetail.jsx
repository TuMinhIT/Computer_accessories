import React from "react";
import { assets } from "../../assets/assets";

const ProductDetail = ({ product, setShowAddModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setShowAddModal(false)}
        />
        <div className="relative w-full max-w-4xl h-[90vh] mt-10 rounded-2xl shadow-2xl border border-gray-300 bg-white flex flex-col overflow-hidden">
          <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar p-6">
            <h2 className="text-2xl text-left">Add new product</h2>
            <div
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              X
            </div>
            <form className="pt-2">
              <div className=""></div>
              {/* <!-- Image gallery --> */}

              <div className="mx-auto mt-6 sm:px-6 flex gap-10">
                <div className="flex flex-col gap-5 max-w-40 ">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                    alt="Two each of gray, white, and black shirts laying flat."
                    className="w-30 h-auto max-h-35 overflow-hidden"
                  />

                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                    alt="Model wearing plain gray basic tee."
                    className="w-30  h-auto max-h-35 overflow-hidden"
                  />
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
                    alt="Model wearing plain white basic tee."
                    className="w-30 h-auto max-h-35 overflow-hidden"
                  />
                </div>
                <div className="flex max-w-500">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                    alt="Model wearing plain black basic tee."
                    className="w-150 h-auto overflow-hidden"
                  />
                </div>
              </div>
              {/* products code and name */}
              <div className="p-5 ">
                <p>code: ADK2515</p>

                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Basic Tee 6-Pack 6-Pack
                </h1>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* <!-- Product info --> */}
                <div className="mx-5 flex flex-col w-full md:w-1/2 md:border-r pr-4 md:border-gray-300">
                  {/* <!-- Description and details --> */}
                  <div>
                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        The Basic Tee 6-Pack allows you to fully express your
                        vibrant personality with three grayscale options.
                        Feeling adventurous? Put on a heather gray tee. Want to
                        be a trendsetter?
                      </p>
                    </div>
                  </div>
                  {/* category and brand */}
                  <div className="mt-10 flex-row flex justify-around">
                    <div className="flex flex-col gap-4 w-full md:flex-row md:gap-8 justify-around">
                      <div className="flex flex-col w-full md:w-1/2">
                        <label
                          htmlFor="category"
                          className="mb-1 font-medium text-gray-700 text-lg"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className="max-w-80 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none bg-white"
                          defaultValue="Phone"
                        >
                          <option value="Phone">Phone</option>
                          <option value="Laptop">Laptop</option>
                          <option value="Tablet">Tablet</option>
                          <option value="Accessory">Accessory</option>
                        </select>
                      </div>
                      <div className="flex flex-col w-full md:w-1/2">
                        <label
                          htmlFor="brand"
                          className="mb-1 font-medium text-gray-700 text-lg"
                        >
                          Brand
                        </label>
                        <select
                          id="brand"
                          className="max-w-80 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none bg-white"
                          defaultValue="Apple"
                        >
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="Xiaomi">Xiaomi</option>
                          <option value="Oppo">Oppo</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- price --> */}
                <div className="mt-4 w-full  md:w-1/2 pl-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label
                        className="mb-1 font-medium text-gray-700"
                        htmlFor="price-sell"
                      >
                        Price sell ($)
                      </label>
                      <input
                        id="price-sell"
                        className="max-w-50 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none"
                        type="number"
                        required
                        placeholder="$1243"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mb-1 font-medium text-gray-700"
                        htmlFor="cost"
                      >
                        Cost ($)
                      </label>
                      <input
                        id="cost"
                        className="max-w-50 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none"
                        type="number"
                        required
                        placeholder="$1243"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mb-1 font-medium text-gray-700"
                        htmlFor="stock"
                      >
                        Stock
                      </label>
                      <input
                        id="stock"
                        className="max-w-50 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none"
                        type="number"
                        required
                        placeholder="100"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mb-1 font-medium text-gray-700"
                        htmlFor="warranty"
                      >
                        Warranty Months
                      </label>
                      <input
                        id="warranty"
                        className="max-w-50 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none"
                        type="number"
                        required
                        placeholder="13"
                      />
                    </div>
                    <div className="flex items-center gap-2 col-span-1 md:col-span-2 mt-2">
                      <input
                        id="bestseller"
                        className="rounded max-w-50 border-gray-300 focus:ring-indigo-200 focus:ring-2"
                        type="checkbox"
                      />
                      <label
                        htmlFor="bestseller"
                        className="font-medium text-gray-700 select-none"
                      >
                        Bestseller
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-10 w-full items-center rounded-lg border border-indigo-600 bg-gradient-to-r from-indigo-500 to-indigo-700 px-8 py-3 text-base font-semibold text-white shadow-lg hover:from-indigo-600 hover:to-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none transition-all duration-150"
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
