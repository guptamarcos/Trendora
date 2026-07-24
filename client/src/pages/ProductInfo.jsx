import { CommentCard, ProductDetails } from "../components/productDetail/Index.jsx";
import { useState, useContext, useEffect } from "react";
import { ProductDetailsSkeleton } from "../components/skeletons/Index.jsx";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import { toast } from "react-toastify";
import { getAllReviews, addReview } from "../api/reviewApi.js";
import Loader from "../components/loaders/Loader.jsx";

function ProductInfo() {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [content, setContent] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [refreshProduct, setRefreshProduct] = useState(false);

  async function getAllProductReviews() {
    try {
      const res = await getAllReviews(productId);
      const showReviews = res?.data?.allReviews.filter((review)=>{
        if(review?.userId?._id === user?._id){
          setRating(review.rating);
        }
        return review.content !== "" ; 
      })
      setAllReviews(showReviews);
      setRefreshProduct((prev) => !prev);
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  async function createNewReview(evt) {
    evt.preventDefault();
    if (!user) {
      navigate("/trendora/login");
      toast.error("Please log In to add product reviews");
      return;
    }

    if (rating === 0) {
      toast.error("Please give some rating");
      return;
    }

    try {
      setReviewLoading(true);
      const res = await addReview(productId, { content, rating });
      const message = content === "" ? "Rating added successfully": "Comment added successfully";
      toast.success(message)
      getAllProductReviews();
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setReviewLoading(false);
    }
  }

  useEffect(() => {
    setRating(0);
    if (productId !== "") getAllProductReviews();
  }, [productId]);

  return (
    <>
      {loading && <ProductDetailsSkeleton />}

      <main className={loading ? "hidden" : "block min-h-screen mb-30"}>
        <ProductDetails setLoading={setLoading} setProductId={setProductId} refreshProduct={refreshProduct}/>

        <section className="mt-10 mb-20">
          {/* HEADING */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold">Customer Feedback</h3>

            <p className="text-gray-500 text-sm mt-1">
              Share your rating or review for this product
            </p>
          </div>

          {/* REVIEW ACTIONS SECTION */}
          <div className="border border-gray-200 rounded-xl bg-white p-8 mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* RATING SECTION */}
            <div className="lg:border-r border-gray-200 lg:pr-10 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-1">
                  Rate this product
                </h4>

                <p className="text-sm text-gray-500 mb-6">
                  Give a quick rating without writing a review
                </p>
              </div>

              {/* Stars */}
              <div className="flex mb-6 text-5xl gap-3 cursor-pointer">
                {[1, 2, 3, 4, 5].map((val, idx) => (
                  <span
                    key={idx}
                    onClick={() => setRating(val)}
                    className={
                      rating >= val ? "text-amber-300" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={createNewReview}
                className="w-fit px-6 py-2.5 border border-black rounded-full hover:bg-gray-100 transition cursor-pointer text-sm font-medium"
              >
                Submit Rating
              </button>
            </div>

            {/* REVIEW SECTION */}
            <div>
              <h4 className="text-lg font-semibold mb-1">Write a review</h4>

              <p className="text-sm text-gray-500 mb-5">
                Tell others about your experience
              </p>

              <form className="space-y-4" onSubmit={createNewReview}>
                <textarea
                  rows="3"
                  value={content}
                  onChange={(evt) => setContent(evt.target.value)}
                  placeholder="What did you like or dislike?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none outline-none focus:ring-1 focus:ring-black focus:border-black transition"
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white rounded-full hover:opacity-90 transition cursor-pointer text-sm font-medium"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </section>

        <section>
          <div>
            {/* PRODUCT REVIEWS HEADER */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-0.5 bg-black" />

              <h4 className="text-3xl font-semibold">
                PRODUCT
                <span className="text-gray-500"> REVIEWS</span>
              </h4>

              <div className="w-12 h-[2px] bg-black" />
            </div>

            {/* REVIEWS GRID */}
            {reviewLoading && <Loader />}
            {!reviewLoading && allReviews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {allReviews?.map((comment, idx) => {
                  return (
                    <CommentCard
                      comment={comment}
                      key={comment._id}
                      getAllProductReviews={getAllProductReviews}
                    />
                  );
                })}
              </div>
            )}
            {!reviewLoading && allReviews.length === 0 && (
              <h4 className="text-2xl text-center">No Reviews available</h4>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default ProductInfo;