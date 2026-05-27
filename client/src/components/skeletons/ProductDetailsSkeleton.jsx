import { ProductCardSkeleton } from "./Index.jsx";

function ProductDetailsSkeleton() {
  return (
    <section className="my-20 px-[7.5vw]">
      {/* Product Layout */}
      <div className="grid md:grid-cols-2 gap-14">
        {/* LEFT - Product Images */}
        <div className="flex gap-4">
          {/* Thumbnail images */}
          <div className="hidden sm:flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1">
            <div className="h-[65vh] w-full bg-gray-200 rounded-2xl animate-pulse shadow-sm" />
          </div>
        </div>

        {/* RIGHT - Product Details */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
          </div>

          <hr className="border-gray-200" />

          {/* Price */}
          <div className="space-y-2">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-9/12 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />

            <div className="flex gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-11 w-14 bg-gray-200 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Quantity + Wishlist */}
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-12 w-14 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="h-12 w-44 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-12 w-44 bg-gray-300 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* CUSTOMER FEEDBACK SKELETON */}
      <section className="mt-20 mb-20">
        {/* Heading */}
        <div className="mb-8 space-y-3">
          <div className="h-8 w-60 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Review Actions */}
        <div className="border border-gray-200 rounded-xl bg-white p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Rating Section */}
          <div className="lg:border-r border-gray-200 lg:pr-10">
            <div className="space-y-3 mb-8">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Stars */}
            <div className="flex gap-4 mb-8">
              {Array.from({ length: 5 }, (_, idx) => (
                <div
                  key={idx}
                  className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"
                />
              ))}
            </div>

            {/* Button */}
            <div className="h-11 w-40 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Review Form Section */}
          <div>
            <div className="space-y-3 mb-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Textarea */}
            <div className="h-32 w-full bg-gray-200 rounded-xl animate-pulse mb-5" />

            {/* Submit Button */}
            <div className="h-11 w-40 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* PRODUCT REVIEWS SKELETON */}
      <section className="mb-24">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-[2px] bg-gray-200 animate-pulse" />

          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />

          <div className="w-12 h-[2px] bg-gray-200 animate-pulse" />
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }, (_, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-5 space-y-4 bg-white"
            >
              {/* User info */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />

                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className="h-5 w-5 rounded bg-gray-200 animate-pulse"
                  />
                ))}
              </div>

              {/* Review text */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-9/12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      <div className="mt-24">
        <div className="flex items-center justify-center mb-10">
          <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }, (_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsSkeleton;