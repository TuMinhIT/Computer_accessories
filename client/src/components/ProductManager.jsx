import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    barcode: "",
    category: "",
    subcategory: "",
    brand: "",
    cost: "",
    stock: "",
    imageUrl: "",
    bestseller: false,
  });

  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/products/${editingId}`, form);
      } else {
        await axios.post(`${API_URL}/api/products`, {
          ...form,
          imageUrl: form.imageUrl.split(",").map((s) => s.trim()),
        });
      }
      setForm({
        name: "",
        price: "",
        barcode: "",
        category: "",
        subcategory: "",
        brand: "",
        cost: "",
        stock: "",
        imageUrl: "",
        bestseller: false,
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      ...product,
      imageUrl: Array.isArray(product.imageUrl)
        ? product.imageUrl.join(", ")
        : product.imageUrl,
    });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Sản phẩm</h2>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        {[
          "name",
          "barcode",
          "brand",
          "category",
          "subcategory",
          "price",
          "cost",
          "stock",
          "imageUrl",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ))}
        <label className="block">
          <input
            type="checkbox"
            name="bestseller"
            checked={form.bestseller}
            onChange={handleChange}
          />{" "}
          Bestseller
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product._id} className="border p-3 rounded shadow-sm">
            <p>
              <strong>{product.name}</strong> - {product.price} VNĐ
            </p>
            <p>
              Category: {product.category} | Subcategory: {product.subcategory}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManager;
