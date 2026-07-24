import { FaTrash } from "react-icons/fa";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";
import { deleteReview } from "../../api/reviewApi.js";
import { toast } from "react-toastify";

function CommentCard({ comment,getAllProductReviews }) {
  const { user } = useContext(UserContext);

  async function handleReviewDelete() {
    try{
      const result = await deleteReview(comment?.productId, comment?._id);
      toast.success("Review deleted successfully");
      getAllProductReviews();
    }catch(err){
      console.log(err);
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  const showDeleteButton = comment?.userId?._id === user?._id;

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={comment?.userId?.profileImage?.path}
            alt="user_Image"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-sm">
              {comment?.userId?.username}
            </h4>
            <p className="text-xs text-gray-500">
              {new Date(comment?.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>
        {showDeleteButton && (
          <button className="mt-3 cursor-pointer" onClick={handleReviewDelete}>
            <FaTrash color="red" />
          </button>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(comment?.rating)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-sm">
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm leading-relaxed">
        {comment?.content}
      </p>
    </div>
  );
}

export default CommentCard;