import CategoryFillter from "./CategoryFillter";
import SearchBar from "./SearchBar";
import SortDropDown from "./SortDropDown";
const FilterBar = ({ products, filteredProducts, setFilteredProducts }) => {
  const handleSelectCategory = (selectedCategory) => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      // Lọc sản phẩm theo category
      const filtered = products.filter(
        (product) => String(product.category._id) === String(selectedCategory)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSort = (sortType) => {
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

  return (
    <div>
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/30 border border-gray-400 px-4 py-2">
        <div className="flex  flex-col lg:flex-row items-center justify-around px-4 py-5 gap-4">
          <CategoryFillter handleSelectCategory={handleSelectCategory} />
          <SearchBar
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
          <SortDropDown handleSort={handleSort} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
