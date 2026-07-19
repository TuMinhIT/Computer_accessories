import { ProductService } from "../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/products/productCard";
import SubTitle from "../components/SubTitle";
import Spinner from "../components/Spinner";
import { CategoryService } from "../admin/components/CategoryService";
import FilterBar from "../components/fillter/FilterBar";
import { useEffect, useState } from "react";
const Products = () => {
  const { getAllProducts, getProduct } = ProductService();
  const { getAllCategories } = CategoryService();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      <FilterBar
        products={products}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
      />
      <div className="px-5 md:px-15 min-h-200">
        {isLoading && <Spinner />}

        {filteredProducts && categories && (
          <>
            {categories.map((cate) => {
              const filtered = filteredProducts.filter((product) => {
                return String(product.category._id) === String(cate._id);
              });

              if (filtered.length > 0) {
                return (
                  <div key={cate._id}>
                    <SubTitle text1={cate.name} text2={""} />
                    <div className="pb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                      {filtered.map((item) => (
                        <ProductCard key={item._id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
