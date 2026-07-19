import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const SortDropDown = ({ handleSort }) => {
  const [sortBy, setSortBy] = useState("default");
  useEffect(() => {
    handleSort(sortBy);
  }, [sortBy]);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white shadow-sm appearance-none focus:outline-none focus:ring-2 focus:to-blue-600"
          >
            <option value="default">Sort default</option>
            <option value="name">Name A-Z</option>
            <option value="price-low">Price-low</option>
            <option value="price-high">Price-high</option>
            <option value="newest">Newest</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#0000F5"
            >
              <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SortDropDown;
