import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { brandsService } from "../../services/brandsService";
import { BrandHooks } from "../../hooks/brandHooks";
import Spinner from "../Spinner";

const BrandModal = ({ setShowBrandModal, editing, brand }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createBrand, updateBrand } = brandsService();
  const { useCreateBrand, useUpdateBrand } = BrandHooks();

  const { mutate, isPending, error } = useCreateBrand();
  const { mutate: mutateEdit, isPending: isPendingEdit } = useUpdateBrand();
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setDescription(brand.description);
      setImage(brand.image);
      setImagePreview(brand.image ? brand.image : null);
    }
  }, [brand]);

  const handleAddBrand = async () => {
    if (name.trim() === "") return;
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

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
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

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

        <div className="space-y-2">
          <label htmlFor="image">
            <input
              onChange={handleImageChange}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0000F5"
            >
              <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
            Upload image
          </label>
          {imagePreview && (
            <div className="mt-2 mx-10 w-50 max-h-64">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg border"
              />
            </div>
          )}
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
