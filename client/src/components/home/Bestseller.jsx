import ProductCard from "../products/productCard";
import SubTitle from "../SubTitle";
import Title from "../Title";
import { products } from "../../assets/assets";
const Bestseller = () => {
  return (
    <div>
      <Title />
      <SubTitle text1={"LAPTOP"} text2={"BESTSELER"} />
      <div className="pb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
