import { useState } from "react";
import Categories from "../component/categories/Categories";
import Brands from "../component/brands/Brands";
import CategoryModel from "../component/categories/CategoryModel";
import BranModel from "../component/brands/BrandModel";

export default function CategoryBrandManager() {
  const [brands, setBrands] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const handleDeleteBrand = (id) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Category Management */}
      <Categories />
      {/* Brand Management */}
      <Brands />
    </div>
  );
}
