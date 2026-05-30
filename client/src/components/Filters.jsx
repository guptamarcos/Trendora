import { FaStar } from "react-icons/fa";

const categories = ["men", "women", "girl", "boy"];

const priceSort = [
  { label: "All", value: 0},
  { label: "Low to High", value: 1 },
  { label: "High to Low", value: -1 },
];

const ratings = [5, 4, 3, 2, 1];

function Filters({ setSortOrder, sortOrder, setCategoryFilter }) {

  function handleCategoryChange(evt) {
    const currSelectedCategory = evt.target.value;

    setCategoryFilter((prev) => ({
      ...prev,
      [currSelectedCategory]: !prev[currSelectedCategory],
    }));
  }

  function handleSortOrder(evt){
    Number(evt.target.value) === sortOrder ? setSortOrder(0): setSortOrder(Number(evt.target.value))
  }

  return (
    <aside className="w-[17.5%] pt-12">
      <h2 className="text-2xl text-gray-700">FILTERS</h2>

      {/* Categories */}
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

      {/* Price Sorting */}
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
     
    </aside>
  );
}

export default Filters;