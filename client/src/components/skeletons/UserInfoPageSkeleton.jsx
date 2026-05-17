function UserInfoPageSkeleton() {
  return (
    <main className="mt-[10vh] mb-[20vh] px-[7.5vw] animate-pulse">
      <section className="flex flex-col lg:flex-row h-[75vh] border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">

        {/* Left Image Skeleton */}
        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
          <div className="w-full h-full bg-gray-300 rounded-2xl"></div>
        </div>

        {/* Right Content Skeleton */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 lg:px-12">
          <div className="w-full max-w-md space-y-8">

            {/* Small heading */}
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-14 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-300 rounded-md"></div>
            </div>

            {/* Main title */}
            <div className="space-y-4">
              <div className="h-12 w-[85%] bg-gray-300 rounded-lg"></div>
              <div className="h-12 w-[70%] bg-gray-300 rounded-lg"></div>
            </div>

            {/* Paragraph skeleton */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded-md"></div>
              <div className="h-4 w-[90%] bg-gray-200 rounded-md"></div>
              <div className="h-4 w-[75%] bg-gray-200 rounded-md"></div>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
              <div className="h-[2px] flex-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-3">
              <div className="h-11 w-32 bg-gray-300 rounded-lg"></div>
              <div className="h-11 w-28 bg-gray-200 rounded-lg"></div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default UserInfoPageSkeleton;