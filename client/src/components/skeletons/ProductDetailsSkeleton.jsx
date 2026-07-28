import { ProductCardSkeleton } from "./Index.jsx";

function ProductDetailsSkeleton() {
  return (
    <section className="my-12 sm:my-16 lg:my-20 px-4 sm:px-6 lg:px-[7.5vw]">
      {/* Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        {/* LEFT - Product Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col gap-3 justify-center sm:justify-start overflow-x-auto sm:overflow-visible">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <div className="h-[320px] sm:h-[500px] lg:h-[65vh] w-full rounded-2xl bg-gray-200 shadow-sm animate-pulse" />
          </div>
        </div>

        {/* RIGHT - Product Details */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Title */}
          <div className="space-y-3">
            <div className="h-7 sm:h-8 w-3/4 rounded bg-gray-200 animate-pulse" />

            <div className="h-5 w-1/3 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-5 w-28 rounded bg-gray-200 animate-pulse" />

            <div className="h-5 w-16 rounded bg-gray-200 animate-pulse" />
          </div>

          <hr className="border-gray-200" />

          {/* Price */}
          <div className="space-y-2">
            <div className="h-7 sm:h-8 w-32 rounded bg-gray-200 animate-pulse" />

            <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />

            <div className="h-4 w-11/12 rounded bg-gray-200 animate-pulse" />

            <div className="h-4 w-10/12 rounded bg-gray-200 animate-pulse" />

            <div className="h-4 w-9/12 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <div className="h-5 w-20 rounded bg-gray-200 animate-pulse" />

            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-10 sm:h-11 w-12 sm:w-14 rounded-md bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Quantity + Wishlist */}
          <div className="flex flex-wrap gap-4">
            <div className="h-11 sm:h-12 w-28 sm:w-32 rounded-lg bg-gray-200 animate-pulse" />

            <div className="h-11 sm:h-12 w-12 sm:w-14 rounded-lg bg-gray-200 animate-pulse" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="h-11 sm:h-12 w-full sm:w-44 rounded-lg bg-gray-200 animate-pulse" />

            <div className="h-11 sm:h-12 w-full sm:w-44 rounded-lg bg-gray-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* CUSTOMER FEEDBACK SKELETON */}
      <section className="mt-16 sm:mt-20 mb-16 sm:mb-20">
        {/* Heading */}
        <div className="mb-6 sm:mb-8 space-y-3">
          <div className="h-7 sm:h-8 w-44 sm:w-60 rounded bg-gray-200 animate-pulse" />

          <div className="h-4 w-60 sm:w-80 rounded bg-gray-200 animate-pulse" />
        </div>

        {/* Review Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-8">
          {/* Rating Section */}
          <div className="lg:border-r border-gray-200 lg:pr-10">
            <div className="mb-8 space-y-3">
              <div className="h-6 w-36 sm:w-40 rounded bg-gray-200 animate-pulse" />

              <div className="h-4 w-48 sm:w-64 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Stars */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
              {Array.from({ length: 5 }, (_, idx) => (
                <div
                  key={idx}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-200 animate-pulse"
                />
              ))}
            </div>

            {/* Button */}
            <div className="h-11 w-36 sm:w-40 rounded-full bg-gray-200 animate-pulse" />
          </div>

          {/* Review Form */}
          <div>
            <div className="mb-6 space-y-3">
              <div className="h-6 w-36 sm:w-40 rounded bg-gray-200 animate-pulse" />

              <div className="h-4 w-44 sm:w-56 rounded bg-gray-200 animate-pulse" />
            </div>

            {/* Textarea */}
            <div className="mb-5 h-28 sm:h-32 w-full rounded-xl bg-gray-200 animate-pulse" />

            {/* Submit Button */}
            <div className="h-11 w-36 sm:w-40 rounded-full bg-gray-200 animate-pulse" />
          </div>
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
