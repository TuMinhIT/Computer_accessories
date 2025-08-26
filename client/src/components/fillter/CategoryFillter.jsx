import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CategoryService } from "../../services/CategoryService";
import { useState } from "react";
const CategoryFillter = () => {
  const { getAllCategories } = CategoryService();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  });

  const [sortBy, setSortBy] = useState("all");

  const handleSort = (e) => {
    toast.warning(e.target.value);
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {categories && (
        <div className="relative w-48">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e)}
            className="w-full px-4 py-2 rounded-lg bg-white shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option key={"all"} value={"all"}>
              All categories
            </option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#000000"
            >
              <path d="M480-360 280-559.33h400L480-360Z" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};

export default CategoryFillter;
