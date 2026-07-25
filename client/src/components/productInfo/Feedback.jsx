import { UserContext } from "../../context/UserContext.jsx";
import { useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { addReview } from "../../api/reviewApi.js";
import { useContext, useEffect, useState } from "react";


function Feedback({ productId,setReviewLoading ,getProductReviews}) {
  
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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
      const message =
        content === ""
          ? "Rating added successfully"
          : "Comment added successfully";
      toast.success(message);
      getProductReviews();
      setRating(0); setContent("");
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setReviewLoading(false);
    }
  }

  useEffect(() => {
    setRating(0);  setContent("");
  }, [productId,getProductReviews]);

  return (
    <section className="mt-10 mb-20">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold">Customer Feedback</h3>

        <p className="text-gray-500 text-sm mt-1">
          Share your rating or review for this product
        </p>
      </div>

      <div className="border border-gray-200 rounded-xl bg-white p-8 mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="lg:border-r border-gray-200 lg:pr-10 flex flex-col justify-evenly">
          <div>
            <h4 className="text-2xl font-semibold mb-1">Rate this product</h4>

            <p className="text-base text-gray-500 mb-6">
              Give a quick rating without writing a review
            </p>
          </div>

          <div className="flex mb-6 text-5xl gap-3 cursor-pointer">
            {[1, 2, 3, 4, 5].map((val, idx) => (
              <span
                key={idx}
                onClick={() => setRating(val)}
                className={rating >= val ? "text-amber-300" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
        </div>

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
  );
}

export default Feedback;
