import { useState } from "react";
import { categoriesService } from "../../services/categoriesService";
import { toast } from "react-toastify";

const CategoryModel = ({ setShowCategoryModal, add, categories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createCategory } = categoriesService();

  const handleEditCategory = (id) => {
    // setCategories(categories.filter((c) => c.id !== id));
  };
  const handleAddCategory = () => {
    if (name.trim() === "") return;

    createCategory({ name, description }).then((res) => {
      if (res.success) {
        categories.unshift(res.category);
        setShowCategoryModal(false);
        toast.success("Category added!");
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!add) return handleEditCategory();
    handleAddCategory();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 bg-opacity-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4"
      >
        <h3 className="text-lg font-bold text-blue-700">Add new category</h3>
        <label htmlFor="name">Category name</label>
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowCategoryModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-black"
          >
            cancel
          </button>
          {add ? (
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryModel;
