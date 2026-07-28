function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-gray-100 px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* HEADER */}
        <div className="space-y-2 sm:space-y-3">
          <div className="h-8 sm:h-9 w-40 sm:w-52 bg-gray-200 rounded-md animate-pulse" />

          <div className="h-4 w-52 sm:w-64 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 4 }, (_, idx) => (
            <div
              key={idx}
              className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Label */}
                <div className="h-4 w-24 sm:w-28 bg-gray-200 rounded animate-pulse" />

                {/* Value */}
                <div className="h-7 sm:h-8 w-16 sm:w-20 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </section>

        {/* MIDDLE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* RECENT ACTIVITY */}
          <div className="lg:col-span-2 rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5 sm:mb-6 flex items-center justify-between">
              <div className="h-6 sm:h-7 w-36 sm:w-44 bg-gray-200 rounded animate-pulse" />

              <div className="h-8 w-24 sm:w-28 rounded-full bg-gray-200 animate-pulse" />
            </div>

            {/* Activities */}
            <div className="space-y-4 sm:space-y-5">
              {Array.from({ length: 3 }, (_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div className="space-y-2">
                    <div className="h-4 w-32 sm:w-40 bg-gray-200 rounded animate-pulse" />

                    <div className="h-3 w-24 sm:w-28 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="h-4 w-16 sm:w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5 sm:mb-6 h-6 sm:h-7 w-24 sm:w-28 bg-gray-200 rounded animate-pulse" />

            {/* Summary Items */}
            <div className="space-y-4 sm:space-y-5">
              {Array.from({ length: 4 }, (_, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between pb-3 ${
                    idx !== 3 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="h-4 w-24 sm:w-28 bg-gray-200 rounded animate-pulse" />

                  <div className="h-4 w-14 sm:w-16 bg-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardSkeleton;