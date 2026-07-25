import Loader from "../loaders/Loader.jsx";
import CommentCard from "./CommentCard.jsx";

function ReviewGrid({ allReviews, reviewLoading, getProductReviews }) {
  return (
    <section>
      <div>
        {allReviews?.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-0.5 bg-black" />

            <h4 className="text-3xl font-semibold">
              PRODUCT
              <span className="text-gray-500"> REVIEWS</span>
            </h4>

            <div className="w-12 h-[2px] bg-black" />
          </div>
        )}

        {reviewLoading ? (
          <Loader />
        ) : allReviews?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allReviews?.map((comment, idx) => {
              return (
                <CommentCard
                  comment={comment}
                  key={comment._id}
                  getProductReviews={getProductReviews}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <h4 className="text-2xl font-semibold mb-2">No Customer Reviews</h4>

            <p className="text-gray-500">
              This product hasn't been reviewed yet.
            </p>

            <p className="text-gray-400 text-sm mt-2">
              Leave a rating or write a review to help others.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewGrid;
