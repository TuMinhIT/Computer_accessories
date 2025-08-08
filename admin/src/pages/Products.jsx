import { useContext, useEffect, useState } from "react";
import { assets, productImages } from "../assets/assets";
import Search from "../component/Search";
import ProductLine from "../component/products/ProductLine";
import AddProduct from "../component/products/AddProduct";
import ProductDetail from "../component/products/ProductDetail";
import { ProductsService } from "../services/productsService";
import { ShopContext } from "../context/ShopContext";
import CustomLoader from "../component/CustomLoader";
const Products = () => {
  const MoocProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      description:
        "iPhone 15 Pro is the latest flagship smartphone from Apple.",
      barcode: "1234567890",
      category: "Phone",
      brand: "Apple",
      price: 1000,
      cost: 800,
      stock: 10,
      warrantyMonths: 12,
      imageUrl: [productImages.screen1, productImages.screen2],
      bestseller: false,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      description:
        "iPhone 15 Pro is the latest flagship smartphone from Apple.",
      barcode: "1234567890",
      category: "xPhone",
      brand: "Axxpple",
      price: 1000,
      cost: 800,
      stock: 10,
      warrantyMonths: 12,
      imageUrl: [productImages.screen3, productImages.screen2],
      bestseller: true,
      color: "blue",
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      description:
        "iPhone 15 Pro is the latest flagship smartphone from Apple.",
      barcode: "1234567890",
      category: "xPhone",
      brand: "Axxpple",
      price: 1000,
      cost: 800,
      stock: 10,
      warrantyMonths: 12,
      imageUrl: [productImages.screen4, productImages.screen2],
      bestseller: true,
      createdAt: "2024-01-15",
      color: "blue",
    },
    {
      id: 4,
      name: "iPhone 14 Pro",
      description:
        "iPhone 15 Pro is the latest flagship smartphone from Apple.",
      barcode: "1234567890",
      category: "xPhone",
      brand: "Axxpple",
      price: 1000,
      cost: 800,
      stock: 10,
      warrantyMonths: 12,
      imageUrl: [productImages.screen4, productImages.screen2],
      color: "blue",
      bestseller: true,
      createdAt: "2024-01-15",
    },
  ];
  const { getAllProducts } = ProductsService();

  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      // const productss = await getAllProducts();
      // console.log(productss);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // setProducts(MoocProducts);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = () => {
    // TODO: call api search
    setProducts(
      MoocProducts.filter((product) =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    );
  };

  return (
    <>
      <CustomLoader />
      {showAddModal && <AddProduct setShowAddModal={setShowAddModal} />}
      <div className="bg-white rounded-xl shadow-sm border ">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Products</h3>

          <Search
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />

          <button
            onClick={() => {
              setShowAddModal(true);
            }}
            className="bg-gray-100 text-black px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + New
          </button>
        </div>
        <div className="overflow-x-auto h-screen">
          {products.map((product) => (
            <ProductLine key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
