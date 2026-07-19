const ProductNotFound = ({ handleCategorySelect }) => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Không tìm thấy sản phẩm
      </h3>
      <p className="text-gray-600 mb-6">
        Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
      </p>
      <button
        onClick={() => handleCategorySelect("all")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Xem tất cả sản phẩm
      </button>
    </div>
  );
};

export default ProductNotFound;
