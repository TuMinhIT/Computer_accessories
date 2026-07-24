import { useEffect, useState } from "react";
import Search from "@admin/components/common/Search";
import ProductLine from "@admin/components/products/ProductLine";
import AddProduct from "../components/products/AddProduct";
import Spinner from "@components/Spinner";
import { productHooks } from "@/hooks/productHooks";
const ProductsAdmin = () => {
  const { useProducts } = productHooks();

  const [searchResult, setSearchResult] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");
  const { data: products, isLoading, refetch } = useProducts();
  const [numProduct, setNumProduct] = useState(0);
  useEffect(() => {
    if (products) {
      setSearchResult(products);
      setNumProduct(products.length);
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
      {showAddModal && <AddProduct setShowAddModal={setShowAddModal} />}

      <div className="bg-white rounded-xl shadow-sm border ">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Products ({numProduct})
          </h3>

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

        <div className="px-3 justify-between overflow-x-auto">
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

export default ProductsAdmin;
