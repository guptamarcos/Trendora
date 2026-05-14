function ProductCardSkeleton() {
  return (
    <div className="animate-pulse w-full">
      <div className="h-[32.5vh] w-full bg-gray-300 rounded-xl"></div>

      <div className="mt-4 space-y-3">
        <div className="h-4 w-[80%] bg-gray-300 rounded"></div>

        <div className="h-4 w-[35%] bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
