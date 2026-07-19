import Banner from "../components/home/Banner";
import Bestseller from "../components/home/Bestseller";
import CategoriesSection from "../components/CategoriesSection";
import { useState } from "react";

function Home() {
  return (
    <>
      <div className=" mx-5 md:mx-20 sm:mx-15 p-3 flex-col">
        <Banner />
        <CategoriesSection />
        {/* <Bestseller /> */}
      </div>
    </>
  );
}

export default Home;
