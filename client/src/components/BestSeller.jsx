import { Product } from "./Index.jsx";
import { bestSellers } from "../api/productApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ProductSectionSkeleton } from "./skeletons/Index.jsx";

function BestSeller() {
  const [bestSellerProduct, setBestSellerProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  async function bestSeller() {
    try {
      setLoading(true);
      const res = await bestSellers();
      setBestSellerProduct(res?.data?.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bestSeller();
  }, []);

  return (
    <>
      {loading && <ProductSectionSkeleton />}
      {!loading && (
        <section className="px-12 py-4 flex flex-col items-center">
          <h2 className="font-outfit text-3xl flex items-center">
            BEST &nbsp;<b>SELLER</b> &nbsp; &nbsp;
            <hr className="w-12 border-t-2 border-black" />
          </h2>
          <p className="pt-2 text-sm font-outfit text-gray-500">
            Explore our top-selling picks that customers can’t get enough of,
            combining trend, comfort, and value.
          </p>
          <div className="w-full grid grid-cols-5 gap-x-5 mt-6">
            {bestSellerProduct.length > 0 &&
              bestSellerProduct.map((product) => {
                return <Product product={product} key={product._id} />;
              })}
          </div>
        </section>
      )}
    </>
  );
}

export default BestSeller;
