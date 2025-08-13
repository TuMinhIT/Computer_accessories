import { useState } from "react";
import { categoriesService } from "../../services/categoriesService";
import CategoryModel from "./CategoryModel";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner";

const Categories = () => {
  const [editing, setEditing] = useState(false);
  const [category, setCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { getAllCategories, deleteCategory } = categoriesService();

  const {
    isLoading,
    data: categories,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    select: (data) => (Array.isArray(data) ? [...data].reverse() : []),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60,
    retry: 1,
  });

  const handleDeleteCategory = async (id) => {
    const res = await deleteCategory(id);
    if (res && res.success) {
      toast.success("Category deleted!");
      refetch();
    } else {
      toast.error(res?.message || "Delete failed");
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 border">
      {showCategoryModal && (
        <CategoryModel
          refetch={refetch}
          setShowCategoryModal={setShowCategoryModal}
          editing={editing}
          category={category}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-700">Categories</h2>
        <button
          onClick={() => {
            setShowCategoryModal(true);
            setEditing(false);
            setCategory(null);
          }}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
        >
          + Add
        </button>
      </div>
      <table className="w-full text-left border-t">
        <thead>
          <tr className="text-gray-600 bg-gray-300 text-sm">
            <th className="py-2 px-2">#</th>
            <th className="py-2">Name</th>
            <th className="py-2">Description</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {!categories || categories.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-gray-400 py-6">
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
                    onClick={() => {
                      setEditing(true);
                      setShowCategoryModal(true);
                      setCategory(cat);
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

export default Categories;
