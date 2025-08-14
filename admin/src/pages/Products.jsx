import { useEffect, useState } from "react";
import Search from "../component/Search";
import ProductLine from "../component/products/ProductLine";
import AddProduct from "../component/products/AddProduct";
import { ProductsService } from "../services/productsService";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../component/Spinner";
const Products = () => {
  const { getAllProducts } = ProductsService();
  const [searchResult, setSearchResult] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

  const {
    isLoading,
    data: products,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  useEffect(() => {
    if (products) {
      setSearchResult(products);
    }
  }, [products]);

  useEffect(() => {
    if (search.trim() !== "") {
      handleSearch();
    } else {
      // Nếu search rỗng thì hiển thị lại toàn bộ sản phẩm
      setSearchResult(products);
    }
  }, [search, products]);

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filtered);
  };

  return (
    <>
      {showAddModal && (
        <AddProduct setShowAddModal={setShowAddModal} refetch={refetch} />
      )}
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

        <div className="px-3 justify-between overflow-x-auto h-screen">
          {isLoading && <Spinner />}

          {/*  nếu ko có products */}
          {!isLoading &&
            Array.isArray(searchResult) &&
            searchResult.length === 0 && (
              <div className="text-blue-600 text-center text-2xl py-10 m-auto ">
                No item found
              </div>
            )}

          {Array.isArray(searchResult) &&
            searchResult.length !== 0 &&
            searchResult.map((product) => (
              <ProductLine
                key={product._id}
                refetch={refetch}
                product={product}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
