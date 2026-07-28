function ProductCardSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Product Image */}
      <div className="h-52 sm:h-64 lg:h-[32.5vh] w-full rounded-xl bg-gray-300"></div>

      {/* Product Info */}
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
        <div className="h-4 w-4/5 rounded bg-gray-300"></div>

        <div className="h-4 w-1/3 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;