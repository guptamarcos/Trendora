import { ProductSectionSkeleton } from "./Index.jsx";

function HomeSkeleton() {
  return (
    <main className="mt-16 sm:mt-20 px-4 sm:px-6 lg:px-[7.5vw] animate-pulse">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row border-2 border-gray-300 rounded-lg min-h-[300px] sm:min-h-[400px] overflow-hidden">

        {/* Left Content Skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-8 sm:px-8">
          <div className="w-full max-w-md space-y-6">

            {/* Small Heading */}
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 sm:w-16 bg-gray-300 rounded"></div>

              <div className="h-4 w-24 sm:w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Large Heading */}
            <div className="space-y-3">
              <div className="h-10 sm:h-12 w-56 sm:w-72 bg-gray-300 rounded"></div>

              <div className="h-10 sm:h-12 w-44 sm:w-56 bg-gray-300 rounded"></div>
            </div>

            {/* Bottom Link */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-20 sm:w-24 bg-gray-300 rounded"></div>

              <div className="h-[2px] w-12 sm:w-16 bg-gray-300 rounded"></div>
            </div>

          </div>
        </div>

        {/* Right Image Skeleton */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full h-64 sm:h-[350px] lg:h-[420px] bg-gray-300 rounded-lg"></div>
        </div>

      </section>

      {/* Product Sections */}
      <ProductSectionSkeleton />
    </main>
  );
}

export default HomeSkeleton;