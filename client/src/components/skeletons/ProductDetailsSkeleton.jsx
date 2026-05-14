function ProductDetailsSkeleton() {
  return (
    <section className="my-20 px-[7.5vw] animate-pulse grid md:grid-cols-2 gap-12">
      {/* PRODUCT IMAGE */}
      <div className="flex justify-center items-start">
        <div className="h-[70vh] w-full max-w-md bg-gray-300 rounded-xl shadow-md"></div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-col justify-evenly gap-6">
        {/* Title */}
        <div className="h-10 w-3/4 bg-gray-300 rounded"></div>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
        </div>

        <hr className="border-gray-200" />

        {/* Description */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-11/12 bg-gray-300 rounded"></div>
          <div className="h-4 w-10/12 bg-gray-300 rounded"></div>
        </div>

        {/* Sizes */}
        <div>

          <div className="flex flex-wrap gap-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-10 w-14 bg-gray-300 rounded-md"
              ></div>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-20 bg-gray-300 rounded-md"></div>


            <div className="h-10 w-20 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-40 bg-gray-300 rounded-md"></div>

          <div className="h-12 w-40 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsSkeleton;