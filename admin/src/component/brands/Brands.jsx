const Brands = ({
  setBrands,
  brands,
  handleDeleteBrand,
  setShowBrandModal,
}) => {
  const handleAddBrand = () => {
    if (newBrand.trim() === "") return;
    setBrands([...brands, { id: Date.now(), name: newBrand }]);
    setNewBrand("");
    setShowBrandModal(false);
  };
  return (
    <div className="bg-white rounded-xl shadow p-6 border">
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
          <tr className="text-gray-600 text-sm">
            <th className="py-2">#</th>
            <th className="py-2">Name</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-400 py-6">
                Chưa có thương hiệu nào.
              </td>
            </tr>
          ) : (
            brands.map((brand, idx) => (
              <tr key={brand.id} className="border-t hover:bg-gray-50 text-sm">
                <td className="py-2">{idx + 1}</td>
                <td className="py-2">{brand.name}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleDeleteBrand(brand.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
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
