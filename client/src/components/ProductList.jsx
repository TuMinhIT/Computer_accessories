import { useEffect, useState } from 'react';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../api/productApi';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

function ProductList() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        barcode: '',
        category: '',
        subcategory: '',
        brand: '',
        price: '',
        cost: '',
        stock: '',
        warrantyMonths: '',
        imageUrl: '',
        bestseller: false,
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        loadProducts();
        loadCategories();
        loadSubcategories();
    }, []);

    const loadProducts = async () => {
        try {
            const res = await fetchProducts();
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadCategories = async () => {
        try {
            const res = await axios.get(`${API}/categories`);
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const loadSubcategories = async () => {
        try {
            const res = await axios.get(`${API}/subcategories`);
            setSubcategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                imageUrl: formData.imageUrl.split(',').map((url) => url.trim()),
            };

            if (editingProduct) {
                await updateProduct(editingProduct._id, data);
            } else {
                await createProduct(data);
            }
            setFormData({
                name: '',
                description: '',
                barcode: '',
                category: '',
                subcategory: '',
                brand: '',
                price: '',
                cost: '',
                stock: '',
                warrantyMonths: '',
                imageUrl: '',
                bestseller: false,
            });
            setEditingProduct(null);
            loadProducts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            barcode: product.barcode,
            category: product.category,
            subcategory: product.subcategory,
            brand: product.brand,
            price: product.price,
            cost: product.cost,
            stock: product.stock,
            warrantyMonths: product.warrantyMonths,
            imageUrl: product.imageUrl.join(', '),
            bestseller: product.bestseller,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h2>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4 mb-6">
                <input name="name" placeholder="Tên sản phẩm" value={formData.name} onChange={handleInputChange} className="border p-2" required />
                <input name="barcode" placeholder="Mã vạch" value={formData.barcode} onChange={handleInputChange} className="border p-2" required />
                <input name="brand" placeholder="Thương hiệu" value={formData.brand} onChange={handleInputChange} className="border p-2" required />
                <input name="price" placeholder="Giá bán" type="number" value={formData.price} onChange={handleInputChange} className="border p-2" required />
                <input name="cost" placeholder="Giá gốc" type="number" value={formData.cost} onChange={handleInputChange} className="border p-2" required />
                <input name="stock" placeholder="Tồn kho" type="number" value={formData.stock} onChange={handleInputChange} className="border p-2" required />
                <input name="warrantyMonths" placeholder="Bảo hành (tháng)" type="number" value={formData.warrantyMonths} onChange={handleInputChange} className="border p-2" />
                <input name="imageUrl" placeholder="Link ảnh (phân cách dấu phẩy)" value={formData.imageUrl} onChange={handleInputChange} className="col-span-2 border p-2" required />
                <textarea name="description" placeholder="Mô tả sản phẩm" value={formData.description} onChange={handleInputChange} className="col-span-2 border p-2" required />

                <select name="category" value={formData.category} onChange={handleInputChange} className="border p-2" >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                        <option value={cat._id} key={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <select name="subcategory" value={formData.subcategory} onChange={handleInputChange} className="border p-2" >
                    <option value="">-- Chọn danh mục con --</option>
                    {subcategories.map((sub) => (
                        <option value={sub._id} key={sub._id}>{sub.name}</option>
                    ))}
                </select>

                <label className="flex items-center space-x-2 col-span-2">
                    <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleInputChange} />
                    <span>Sản phẩm bán chạy</span>
                </label>

                <div className="col-span-2 flex space-x-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                    </button>
                    {editingProduct && (
                        <button type="button" onClick={() => {
                            setEditingProduct(null);
                            setFormData({
                                name: '',
                                description: '',
                                barcode: '',
                                category: '',
                                subcategory: '',
                                brand: '',
                                price: '',
                                cost: '',
                                stock: '',
                                warrantyMonths: '',
                                imageUrl: '',
                                bestseller: false,
                            });
                        }} className="text-red-500 underline">
                            Huỷ chỉnh sửa
                        </button>
                    )}
                </div>
            </form>

            <ul className="space-y-2">
                {products.map((p) => (
                    <li key={p._id} className="bg-gray-100 p-4 rounded flex justify-between items-center">
                        <div>
                            <strong>{p.name}</strong> - {p.price} VNĐ
                            <div className="text-sm text-gray-500">{p.description}</div>
                        </div>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(p)} className="bg-yellow-500 px-3 py-1 rounded text-white">Sửa</button>
                            <button onClick={() => handleDelete(p._id)} className="bg-red-500 px-3 py-1 rounded text-white">Xoá</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
