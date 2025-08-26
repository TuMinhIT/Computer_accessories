import { useState, useEffect } from "react";
import CategorySidebar from "../components/category/CategorySidebar";
import Title from "../components/Title";
import ProductCard from "../components/products/ProductCard";
import Pagination from "../components/products/Pagination";
import ProductNotFound from "../components/products/ProductNotFound";
import SearchBar from "../components/SearchBar";
import { ProductsService } from "../services/productsService";
import { useQuery } from "@tanstack/react-query";
const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [sortBy, setSortBy] = useState("default");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { getAllProducts } = ProductsService();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);

    // Filter products by category
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.name === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredProducts];

    switch (sortType) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  // Pagination
  // const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const totalPages = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentProducts = filteredProducts.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );

  const currentProducts = filteredProducts;
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block lg:w-64 xl:w-64 flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <CategorySidebar
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <CategorySidebar
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1  min-w-0">
          {filteredProducts && (
            <div className="p-4 lg:p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4">
                  <div>
                    <h2 className="text-3xl">Tất cã sản phẩm</h2>
                    <p className="text-gray-600 mt-2">
                      {currentProducts.length} trong tổng số{" "}
                      {filteredProducts.length} sản phẩm
                    </p>
                  </div>
                  <SearchBar
                    setFilteredProducts={setFilteredProducts}
                    products={products}
                  />

                  {/* Controls */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="default">Sắp xếp mặc định</option>
                      <option value="name">Tên A-Z</option>
                      <option value="price-low">Giá thấp đến cao</option>
                      <option value="price-high">Giá cao đến thấp</option>
                      <option value="newest">Mới nhất</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {selectedCategory !== "all" && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Bộ lọc đang áp dụng:
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {selectedCategory}
                      <button
                        onClick={() => handleCategorySelect("all")}
                        className="ml-2 hover:text-green-600"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                )}
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 lg:gap-4">
                    {filteredProducts.map((item) => (
                      <div key={item._id} className="w-full">
                        <ProductCard item={item} />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={totalPages}
                    />
                  )}
                </>
              ) : (
                <ProductNotFound handleCategorySelect={handleCategorySelect} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
