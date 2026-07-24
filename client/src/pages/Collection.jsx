import Filters from "../components/collection/Filters.jsx";
import ProductGrid from "../components/collection/ProductGrid.jsx";
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
  const [sortOrder, setSortOrder] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState({
    men: false,
    women: false,
    girl: false,
    boy: false,
  });

  async function GetAllProducts() {
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
    GetAllProducts();
  }, []);

  const showProducts = getShowProducts(sortOrder, categoryFilter, allProducts);

  if (loading) {
    return <CollectionSkeleton />;
  }

  return (
    <main className="mb-40 min-h-screen flex gap-8">
      <Filters
        setSortOrder={setSortOrder}
        sortOrder={sortOrder}
        setCategoryFilter={setCategoryFilter}
      />
      <ProductGrid showProducts={showProducts} />
    </main>
  );
}

export default Collection;
