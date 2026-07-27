import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const categories = ["men", "women", "girl", "boy"];

const priceSort = [
  { label: "All", value: 0 },
  { label: "Low to High", value: 1 },
  { label: "High to Low", value: -1 },
];

function Filters({ setSortOrder, sortOrder, setCategoryFilter }) {
  const [showFilter, setShowFilter] = useState(false);

  function handleCategoryChange(evt) {
    const currSelectedCategory = evt.target.value;

    setCategoryFilter((prev) => ({
      ...prev,
      [currSelectedCategory]: !prev[currSelectedCategory],
    }));
  }

  function handleSortOrder(evt) {
    Number(evt.target.value) === sortOrder
      ? setSortOrder(0)
      : setSortOrder(Number(evt.target.value));
  }

  return (
    <aside className="w-full lg:w-[17.5%] pt-6 lg:pt-12">
      <button
        onClick={() => setShowFilter((prev) => !prev)}
        className="flex items-center gap-2 text-2xl text-gray-700 cursor-pointer lg:cursor-default"
      >
        FILTERS
        {showFilter ? <FiX /> : <FiFilter />}
      </button>

      <div className={`${showFilter ? "block" : "hidden"} lg:block`}>
        <div className="border-2 border-gray-400 p-4 my-4">
          <h4 className="text-lg font-semibold pb-2">
            CATEGORIES
          </h4>

          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <label
                htmlFor={category}
                className="pl-2 cursor-pointer capitalize"
              >
                <input
                  type="checkbox"
                  value={category}
                  id={category}
                  className="mr-2"
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            </div>
          ))}
        </div>

        <div className="border-2 border-gray-400 p-4 my-4">
          <h4 className="text-lg font-semibold pb-2">
            SORT BY PRICE
          </h4>

          {priceSort.map((item) => (
            <div key={item.value} className="flex items-center">
              <label
                htmlFor={item.value}
                className="pl-2 cursor-pointer"
              >
                <input
                  type="radio"
                  defaultChecked={item.value === 0}
                  name="priceSort"
                  value={item.value}
                  id={item.value}
                  className="mr-2"
                  onChange={handleSortOrder}
                />
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Filters;