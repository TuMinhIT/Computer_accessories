import Categories from "../component/categories/Categories";
import Brands from "../component/brands/Brands";

export default function CategoryBrandManager() {
  return (
    <div className="flex flex-col gap-6">
      {/* Category Management */}
      <Categories />
      {/* Brand Management */}
      <Brands />
    </div>
  );
}
