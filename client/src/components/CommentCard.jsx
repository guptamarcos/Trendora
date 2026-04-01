function CommentCard() {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {/* Top Section */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-sm">Gauri Shankar</h4>
          <p className="text-xs text-gray-500">2 days ago</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-sm">
            ★
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 text-sm leading-relaxed">
        The quality of this T-shirt is really good. The fabric feels soft and
        comfortable, and the fitting is perfect. Definitely worth the price!
      </p>
    </div>
  );
}

export default CommentCard;
