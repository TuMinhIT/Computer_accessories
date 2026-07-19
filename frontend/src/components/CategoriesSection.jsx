import React, { useState } from "react";
import { CategoryService } from "../admin/components/CategoryService";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";
import Title from "./Title";

const CategoriesSection = () => {
  const { getAllCategories } = CategoryService();

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <Title text={"CATEGORIES"} />
      {isLoading && <Spinner />}
      <div className="mb-10 categories-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-5">
        {categories && (
          <>
            {categories.map((category) => (
              <div
                key={category._id}
                className="category-card p-2   border-b-2 hover:shadow-lg hover:bg-gray-100 transition"
              >
                <h3 className="text-lg prata-regular font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CategoriesSection;
