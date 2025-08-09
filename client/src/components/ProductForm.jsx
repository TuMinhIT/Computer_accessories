import { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  fetchCategories,
  fetchSubcategories,
} from "../api/productApi";

function ProductForm({ product, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    barcode: "",
    category: "",
    subcategory: "",
    brand: "",
    price: "",
    cost: "",
    stock: "",
    warrantyMonths: "",
    imageUrl: "",
    bestseller: false,
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (product) setFormData({ ...product });

    const loadCategories = async () => {
      const res = await fetchCategories();
      setCategories(res.data);
    };

    const loadSubcategories = async () => {
      const res = await fetchSubcategories();
      setSubcategories(res.data);
    };

    loadCategories();
    loadSubcategories();
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        cost: Number(formData.cost),
        stock: Number(formData.stock),
        warrantyMonths: Number(formData.warrantyMonths),
        imageUrl: formData.imageUrl.split(",").map((url) => url.trim()),
      };

      if (product?._id) {
        await updateProduct(product._id, data);
      } else {
        await createProduct(data);
      }

      setFormData({
        name: "",
        description: "",
        barcode: "",
        category: "",
        subcategory: "",
        brand: "",
        price: "",
        cost: "",
        stock: "",
        warrantyMonths: "",
        imageUrl: "",
        bestseller: false,
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Không thể lưu sản phẩm");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded mb-5">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Tên sản phẩm"
        required
        className="w-full p-2 border"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Mô tả"
        required
        className="w-full p-2 border"
      />
      <input
        name="barcode"
        value={formData.barcode}
        onChange={handleChange}
        placeholder="Barcode"
        required
        className="w-full p-2 border"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full p-2 border"
      >
        <option value="">-- Chọn danh mục --</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        name="subcategory"
        value={formData.subcategory}
        onChange={handleChange}
        required
        className="w-full p-2 border"
      >
        <option value="">-- Chọn danh mục con --</option>
        {subcategories.map((s) => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Thương hiệu"
        required
        className="w-full p-2 border"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Giá bán"
        required
        className="w-full p-2 border"
      />
      <input
        name="cost"
        type="number"
        value={formData.cost}
        onChange={handleChange}
        placeholder="Giá gốc"
        required
        className="w-full p-2 border"
      />
      <input
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Tồn kho"
        required
        className="w-full p-2 border"
      />
      <input
        name="warrantyMonths"
        type="number"
        value={formData.warrantyMonths}
        onChange={handleChange}
        placeholder="Bảo hành (tháng)"
        className="w-full p-2 border"
      />
      <input
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Link ảnh (cách nhau bằng dấu phẩy)"
        required
        className="w-full p-2 border"
      />
      <label className="flex items-center">
        <input
          name="bestseller"
          type="checkbox"
          checked={formData.bestseller}
          onChange={handleChange}
          className="mr-2"
        />
        Bán chạy
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {product ? "Cập nhật" : "Thêm sản phẩm"}
      </button>
    </form>
  );
}

export default ProductForm;
