function UserInfoPageSkeleton() {
  return (
    <main className="mt-[8vh] sm:mt-[10vh] mb-16 sm:mb-24 lg:mb-[20vh] px-4 sm:px-6 lg:px-[7.5vw] animate-pulse">
      <section className="flex flex-col lg:flex-row min-h-[500px] lg:h-[75vh] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Left Image Skeleton */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 flex items-center justify-center">
          <div className="h-64 sm:h-80 lg:h-full w-full rounded-2xl bg-gray-300"></div>
        </div>

        {/* Right Content Skeleton */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-8">
          <div className="w-full max-w-md space-y-6 sm:space-y-8">

            {/* Small Heading */}
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 sm:w-14 rounded-full bg-gray-300"></div>

              <div className="h-4 w-24 sm:w-28 rounded-md bg-gray-300"></div>
            </div>

            {/* Main Title */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-10 sm:h-12 w-[85%] rounded-lg bg-gray-300"></div>

              <div className="h-10 sm:h-12 w-[70%] rounded-lg bg-gray-300"></div>
            </div>

            {/* Paragraph */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded-md bg-gray-200"></div>

              <div className="h-4 w-[90%] rounded-md bg-gray-200"></div>

              <div className="h-4 w-[75%] rounded-md bg-gray-200"></div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-4 w-16 sm:w-20 rounded-md bg-gray-300"></div>

              <div className="h-[2px] flex-1 rounded-full bg-gray-300"></div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3">
              <div className="h-11 w-full sm:w-32 rounded-lg bg-gray-300"></div>

              <div className="h-11 w-full sm:w-28 rounded-lg bg-gray-200"></div>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}

export default UserInfoPageSkeleton;