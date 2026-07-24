import { Product } from "../Index.jsx";
import { latestCollections } from "../../api/productApi.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { ProductSectionSkeleton } from "../skeletons/Index.jsx";

function LatestCollections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  async function productInfo() {
    try {
      setLoading(true);
      const res = await latestCollections();
      setProducts(res?.data?.data);
    } catch (err) {
      const message = err?.res?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    productInfo();
  }, []);

  return (
    <>
      {loading && <ProductSectionSkeleton />}
      {!loading && (
        <section className="p-12 flex flex-col items-center">
          <h2 className="font-outfit pt-8 text-3xl flex items-center">
            LATEST &nbsp;<b>COLLECTIONS</b> &nbsp; &nbsp;
            <hr className="w-12 border-t-2 border-black" />
          </h2>
          <p className="pt-2 text-sm font-outfit text-gray-500">
            Explore our latest collections, inspired by current trends,crafted
            to bring you style, comfort, and confidence every day.
          </p>
          <div className="w-full grid grid-cols-5 gap-y-8 gap-x-5 mt-6">
            {products.length > 0 &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </section>
      )}
    </>
  );
}

export default LatestCollections;
