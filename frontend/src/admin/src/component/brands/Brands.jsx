import { useState } from "react";
import BrandModel from "./BrandModel";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { BrandHooks } from "../../hooks/brandHooks";
const Brands = () => {
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [brand, setBrand] = useState(null);

  const { useBrands, useDeleteBrand } = BrandHooks();

  const { isLoading, data: brands, error } = useBrands();
  const { mutate, isPending } = useDeleteBrand();
  const handleDeleteBrand = async (id) => {
    mutate(id, {
      onSuccess: (res) => {
        if (res && res.success) {
          toast.success("Brand deleted!");
          refetch();
        } else {
          toast.error(res?.message || "Delete failed");
        }
      },
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">{error.message}</div>;
  return (
    <div className="bg-white rounded-xl shadow p-6 border">
      {isPending && <Spinner />}
      {showBrandModal && (
        <BrandModel
          setShowBrandModal={setShowBrandModal}
          editing={editing}
          brand={brand}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-700">Brands</h2>
        <button
          onClick={() => setShowBrandModal(true)}
          className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 text-sm"
        >
          + Add
        </button>
      </div>

      <table className="w-full text-left border-t">
        <thead>
          <tr className="text-gray-600 bg-gray-300 text-sm">
            <th className="py-2">#</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {!brands || brands.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-400 py-6">
                There are no categories yet.
              </td>
            </tr>
          ) : (
            brands.map((brand, idx) => (
              <tr key={brand._id} className="border-t hover:bg-gray-50 text-sm">
                <td className="py-2 px-2">{idx + 1}</td>
                <td className="py-2 font-bold text-blue-400">
                  <div className="flex flex-col">
                    {brand.name}

                    <img
                      src={brand.image}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border"
                    />
                  </div>
                </td>
                <td className="py-2">{brand.description}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDeleteBrand(brand._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <span className="mx-2">/</span>
                  <button
                    onClick={() => {
                      setEditing(true);
                      setShowBrandModal(true);
                      setBrand(brand);
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Brands;
