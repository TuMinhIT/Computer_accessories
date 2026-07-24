import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { BrandHooks } from "@/hooks/brandHooks";
import Spinner from "@components/Spinner";

const BrandModal = ({ setShowBrandModal, editing, brand }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { useCreateBrand, useUpdateBrand } = BrandHooks();

  const { mutate, isPending, error } = useCreateBrand();
  const { mutate: mutateEdit, isPending: isPendingEdit } = useUpdateBrand();

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setDescription(brand.description);
    }
  }, [brand]);

  const handleAddBrand = async () => {
    if (name.trim() === "") return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);


    mutate(formData, {
      onSuccess: (res) => {
        if (res && res.success) {
          toast.success("Brand added!");
          setShowBrandModal(false);
        }
      },
      onError: (res) => {
        toast.error(res);
      },
    });
  };
  const handleEditBrand = async () => {
    if (name.trim() === "") return;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    mutateEdit(
      { id: brand._id, data: formData },
      {
        onSuccess: (res) => {
          if (res && res.success) {
            toast.success("Brand updated!");
            setShowBrandModal(false);
          }
        },
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) return handleEditBrand();
    handleAddBrand();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4">
        {isPending && <Spinner />}
        <h3 className="text-lg font-bold text-indigo-700">Add new brand</h3>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả thương hiệu"
            rows={2}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>



        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setShowBrandModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
