import { useEffect } from "react";
import { categoriesService } from "../../services/categoriesService";
import { useState } from "react";
import CategoryModel from "./CategoryModel";

import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { getAllCategories, deleteCategory, updateCategory } =
    categoriesService();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  useEffect(() => {
    getAllCategories().then((res) => {
      if (res.success) {
        setCategories(res.categories.reverse());
      } else {
        toast.error(res.message);
      }
    });
  }, []);

  const handleEditCategory = (id) => {
    setCategories(categories.filter((c) => c._id !== id));
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id).then((res) => {
      if (res.success) {
        toast.success("Category deleted!");
        setCategories(categories.filter((c) => c._id !== id));
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 border">
      {showCategoryModal && (
        <CategoryModel
          categories={categories}
          add={true}
          setShowCategoryModal={setShowCategoryModal}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">Categories</h2>
        <button
          onClick={() => setShowCategoryModal(true)}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
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
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-400 py-6">
                There are no categories yet.
              </td>
            </tr>
          ) : (
            categories.map((cat, idx) => (
              <tr key={cat._id} className="border-t hover:bg-gray-50 text-sm">
                <td className="py-2">{idx + 1}</td>
                <td className="py-2 font-bold text-blue-400">{cat.name}</td>
                <td className="py-2">{cat.description}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                  <span className="mx-2">/</span>
                  <button
                    onClick={() => handleEditCategory(cat._id)}
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

export default Categories;
