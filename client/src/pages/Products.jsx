import { ProductService } from "../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import ProductCard from "../components/products/productCard";
import Title from "../components/Title";
import SubTitle from "../components/SubTitle";
import Spinner from "../components/Spinner";
const Products = () => {
  const { getAllProducts, getProduct } = ProductService();
  const [bestsellers, setBestsellers] = useState();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
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
      <Title />
      {isLoading && <Spinner />}
      {bestsellers && (
        <>
          <SubTitle text1={"LAPTOP"} text2={"BESTSELLER"} />
          <div className="pb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {bestsellers.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
