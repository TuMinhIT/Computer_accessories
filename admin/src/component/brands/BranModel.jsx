import React from "react";

const BranModel = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4">
        <h3 className="text-lg font-bold text-indigo-700">
          Thêm thương hiệu mới
        </h3>
        <input
          type="text"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          placeholder="Tên thương hiệu"
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowBrandModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-black"
          >
            Hủy
          </button>
          <button
            onClick={handleAddBrand}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranModel;
