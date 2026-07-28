function AdminSectionSkeleton() {
  return (
    <main className="w-full min-h-screen bg-gray-50 animate-pulse p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="space-y-2 sm:space-y-3">
          <div className="h-7 sm:h-8 w-40 sm:w-52 bg-gray-300 rounded-md"></div>

          <div className="h-4 w-52 sm:w-72 bg-gray-200 rounded-md"></div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4">
          {/* Search */}
          <div className="h-11 w-full lg:w-80 bg-gray-200 rounded-lg"></div>

          {/* Filter */}
          <div className="h-11 w-full sm:w-52 lg:w-40 bg-gray-200 rounded-lg"></div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[850px]">

              {/* TABLE HEADER */}
              <div className="grid grid-cols-5 gap-4 border-b border-gray-200 p-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-20 rounded bg-gray-300"
                  />
                ))}
              </div>

              {/* TABLE ROWS */}
              <div className="divide-y divide-gray-100">
                {[...Array(7)].map((_, row) => (
                  <div
                    key={row}
                    className="grid grid-cols-5 gap-4 items-center p-4"
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300"></div>

                      <div className="space-y-2">
                        <div className="h-4 w-24 rounded bg-gray-300"></div>

                        <div className="h-3 w-16 rounded bg-gray-200"></div>
                      </div>
                    </div>

                    {/* Other Columns */}
                    <div className="h-4 w-20 rounded bg-gray-200"></div>

                    <div className="h-4 w-24 rounded bg-gray-200"></div>

                    <div className="h-6 w-16 rounded-full bg-gray-300"></div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-md bg-gray-200"></div>

                      <div className="h-8 w-8 rounded-md bg-gray-200"></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="h-4 w-40 rounded bg-gray-200"></div>

          <div className="flex w-full sm:w-auto gap-2">
            <div className="h-10 flex-1 sm:w-20 rounded-lg bg-gray-300"></div>

            <div className="h-10 flex-1 sm:w-20 rounded-lg bg-gray-300"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSectionSkeleton;