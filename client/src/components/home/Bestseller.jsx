import ProductCard from "../products/productCard";
import SubTitle from "../SubTitle";
import Title from "../Title";

import { ProductService } from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { CategoryService } from "../../services/CategoryService";
const Bestseller = () => {
  const { getAllProducts, getProduct } = ProductService();
  const { getAllCategories } = CategoryService();

  const [bestsellers, setBestsellers] = useState();

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
    if (products) {
      const temp = products.filter((product) => product.bestseller);
      setBestsellers(temp);
    }
  }, [products]);

  return (
    <div>
      <Title text={"BESTSELLER"} />
      {isLoading && <Spinner />}
      {bestsellers && categories && (
        <>
          {categories.map((cate) => {
            const filteredBestsellers = bestsellers.filter((product) => {
              return String(product.category._id) === String(cate._id);
            });

            if (filteredBestsellers.length > 0) {
              return (
                <div key={cate._id}>
                  <SubTitle text1={cate.name} text2={"BESTSELLER"} />
                  <div className="pb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {filteredBestsellers.map((item) => (
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
  );
};

export default Bestseller;
