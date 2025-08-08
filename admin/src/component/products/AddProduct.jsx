import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ImageForm from "./ImageForm";
const AddProduct = ({ setShowAddModal }) => {
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    category: "",
    brand: "",
    price: "",
    cost: "",
    stock: "",
    warrantyMonths: "",
    description: "",
    bestseller: false,
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const maxImage = 9;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Product added!");
    // setShowAddModal(false);
  };
  useEffect(() => {
    console.log(form.images);
  }, [form.images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const remainingSlots = maxImage - form.images.length;
    const filesToAdd = files.slice(0, remainingSlots);

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...filesToAdd],
    }));
    setImagePreviews((prev) => [
      ...prev,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ]);
    console.log(form.images);
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setShowAddModal(false)}
        />
        <div className="relative w-full max-w-4xl h-[90vh] mt-10 rounded-2xl shadow-2xl border border-gray-300 bg-white flex flex-col overflow-hidden">
          <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar p-6">
            <h2 className="text-2xl text-left font-bold">Add new product</h2>
            <div
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              X
            </div>
            <form onSubmit={handleSubmit} className="pt-2">
              {/* <!-- Image gallery --> */}

              <ImageForm
                maxImage={maxImage}
                imagePreviews={imagePreviews}
                onChange={handleImageChange}
                onRemove={handleRemoveImage}
              />

              {/* products code and name */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <label className="font-bold" htmlFor="barcode">
                    Barcode:
                  </label>
                  <input
                    required
                    className="border-0 border-b border-b-gray-400 px-2 py-1 w-1/3 mx-3 focus:outline-none focus:border-b-blue-500 transition-all duration-200 rounded-none"
                    type="text"
                    name="barcode"
                    id=""
                  />
                </div>
                <div>
                  <label className="font-bold" htmlFor="barcode">
                    Product name:
                  </label>
                  <input
                    required
                    className="border-0 border-b border-b-gray-400 px-2 py-1 w-2/3 mx-3 focus:outline-none focus:border-b-blue-500 transition-all duration-200 rounded-none"
                    type="text"
                    name="barcode"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                {/* <!-- Product info --> */}
                <div className="mx-5 flex flex-col w-full md:w-1/2 lg:border-r pr-4 lg:border-gray-300">
                  {/* <!-- Description and details --> */}
                  <div>
                    <div className="space-y-6">
                      <textarea
                        placeholder="Description"
                        className="border px-4 border-gray-300 rounded-2xl w-full "
                        type="textarea"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                  {/* category and brand */}
                  <div className="mt-5 flex-row flex justify-around">
                    <div className="flex flex-col gap-4 w-full md:flex-row md:gap-8 justify-around">
                      <div className="flex flex-col w-full md:w-1/2">
                        <label
                          htmlFor="category"
                          className="mb-1 font-bold text-gray-700"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className=" max-w-80 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none bg-white"
                          defaultValue="none"
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
                          className="mb-1 font-bold text-gray-700 "
                        >
                          Brand
                        </label>
                        <select
                          id="brand"
                          className="max-w-80 rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition w-full outline-none bg-white"
                          defaultValue="none"
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

export default AddProduct;
