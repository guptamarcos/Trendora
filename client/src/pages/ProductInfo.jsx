import { ProductDetails, Feedback, ReviewGrid } from "../components/productInfo/Index.jsx";
import { useState, useEffect } from "react";
import { ProductDetailsSkeleton } from "../components/skeletons/Index.jsx";
import { toast } from "react-toastify";
import { getAllReviews } from "../api/reviewApi.js";
import Loader from "../components/loaders/Loader.jsx";


function ProductInfo() {
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [refreshProduct, setRefreshProduct] = useState(false);

  async function getProductReviews() {
    try {
      const res = await getAllReviews(productId);
      setAllReviews(res?.data?.allReviews);
      setRefreshProduct((prev) => !prev);
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }


  useEffect(() => {
    if (productId !== "") {
      getProductReviews();
    }
  }, [productId]);

  return (
    <>
      {loading && <ProductDetailsSkeleton />}

      <main className={loading ? "hidden" : "block min-h-screen mb-30"}>
        <ProductDetails
          setLoading={setLoading}
          setProductId={setProductId}
          refreshProduct={refreshProduct}
        />

        <Feedback
          productId={productId}
          setReviewLoading={setReviewLoading}
          getProductReviews={getProductReviews}
        />

        <ReviewGrid
          allReviews={allReviews}
          reviewLoading={reviewLoading}
          getProductReviews={getProductReviews}
        />
      </main>
    </>
  );
}

export default ProductInfo;
