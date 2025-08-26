import CategoryFillter from "./CategoryFillter";
import SearchBar from "./SearchBar";
import SortDropDown from "./SortDropDown";
const FilterBar = ({ categories, products, setFilteredProducts }) => {
  return (
    <div>
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/30 border border-gray-400 px-4 py-2">
        <div className="flex flex-row items-center justify-around px-15 py-5">
          <CategoryFillter />
          <SearchBar
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
          <SortDropDown />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
