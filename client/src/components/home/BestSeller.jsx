import { Product } from "../Index.jsx";
import { bestSellers } from "../../api/productApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ProductSectionSkeleton } from "../skeletons/Index.jsx";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function BestSeller() {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextIndex, setNextIndex] = useState(4);
  const [prevIndex, setPrevIndex] = useState(0);

  async function bestSeller() {
    try {
      setLoading(true);
      const res = await bestSellers();
      setBestSellerProducts(res?.data?.data);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (nextIndex === bestSellerProducts.length - 1) {
      return;
    }

    setNextIndex((currVal) => currVal + 1);
    setPrevIndex((currVal) => currVal + 1);
  }

  function handlePrev() {
    if (prevIndex === 0) {
      return;
    }

    setPrevIndex((currVal) => currVal - 1);
    setNextIndex((currVal) => currVal - 1);
  }

  useEffect(() => {
    bestSeller();
  }, []);

  if (loading) {
    return <ProductSectionSkeleton />;
  }

  return (
    <section className="px-12 py-4 flex flex-col items-center relative">
      <h2 className="font-outfit text-3xl flex items-center">
        BEST &nbsp;<b>SELLER</b> &nbsp; &nbsp;
        <hr className="w-12 border-t-2 border-black" />
      </h2>
      <p className="pt-2 text-sm font-outfit text-gray-500">
        Explore our top-selling picks that customers can’t get enough of,
        combining trend, comfort, and value.
      </p>
      <div className="w-full grid grid-cols-5 gap-x-5 mt-6">
        {bestSellerProducts.length > 0 &&
          bestSellerProducts.slice(prevIndex, nextIndex + 1).map((product) => {
            return <Product product={product} key={product._id} />;
          })}
      </div>

      <div
        className={`absolute left-0 top-[50%] cursor-pointer ${prevIndex === 0 ? "opacity-50" : ""}`}
        onClick={handlePrev}
      >
        <IoChevronBack size={24} />
      </div>

      <div
        className={`absolute right-0 top-[50%] cursor-pointer ${nextIndex === 9 ? "opacity-50" : ""}`}
        onClick={handleNext}
      >
        <IoChevronForward size={24} />
      </div>
    </section>
  );
}

export default BestSeller;
