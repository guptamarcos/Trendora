import { Filters, Product } from "../components/Index.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../api/productApi.js";
import { CollectionSkeleton } from "../components/skeletons/Index.jsx";

function getShowProducts(sortOrder, categoryFilter, allProducts) {
  let showProducts = allProducts?.filter((product) => {
    const productCategory = product.category;
    return categoryFilter[productCategory];
  });

  if (showProducts?.length === 0) {
    showProducts = [...allProducts];
  }

  if (sortOrder === 1) {
    showProducts.sort((curr, next) => curr.price - next.price);
  } else if (sortOrder === -1) {
    showProducts.sort((curr, next) => next.price - curr.price);
  }

  return showProducts;
}


function Collection() {
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState({
    men: false,
    women: false,
    girl: false,
    boy: false,
  });
  const [sortOrder, setSortOrder] = useState(0);

  async function getAllProductInfo() {
    try {
      setLoading(true);
      const res = await getAllProducts();
      setAllProducts(res?.data?.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProductInfo();
  }, []);

  const showProducts = getShowProducts(sortOrder, categoryFilter, allProducts);

  if (loading) {
    return <CollectionSkeleton />;
  }

  return (
    <section className="mb-40 min-h-screen flex gap-8">
      <Filters
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        setCategoryFilter={setCategoryFilter}
      />
      <div className="flex-1">
        <div className="py-6 flex justify-between ">
          <h2 className="text-3xl flex items-center">
            ALL&nbsp;<b>COLLECTIONS</b>&nbsp;&nbsp;
            <hr className="w-[5vw] border-t-2 border-black" />
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {showProducts?.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Collection;
