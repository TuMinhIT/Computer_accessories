import Categories from "@admin/components/categories/Categories";
import Brands from "@admin/components/brands/Brands";

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
