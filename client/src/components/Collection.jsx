import { Filters, Product } from "./Index.jsx";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAllProductInfo } from "../api/productApi.js";

function Collection() {
  const [allProducts, setAllProducts] = useState(null);
  const [activeFilter, setActiveFilter] = useState({
    men: false,
    women: false,
    girl: false,
    boy: false,
  });

  async function getProductInfo() {
    try {
      const res = await getAllProductInfo();
      setAllProducts(res?.data?.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  useEffect(() => {
    getProductInfo();
  }, []);

  let showProducts = allProducts?.filter((product) => {
    const productCategory = product.category;
    return activeFilter[productCategory];
  });

  if(showProducts?.length === 0){
    showProducts = allProducts;
  }

  return (
    <section className="mb-40 min-h-screen flex gap-8">
      <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
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
