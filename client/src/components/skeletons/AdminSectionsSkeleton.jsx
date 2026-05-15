function AdminSectionSkeleton() {
  return (
    <main className="w-full min-h-screen p-6 bg-gray-50 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="space-y-3">
          <div className="h-8 w-52 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-72 bg-gray-200 rounded-md"></div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search bar */}
          <div className="h-11 w-full md:w-80 bg-gray-200 rounded-lg"></div>

          {/* Filter dropdown */}
          <div className="h-11 w-40 bg-gray-200 rounded-lg"></div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded w-20" />
            ))}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {[...Array(7)].map((_, row) => (
              <div
                key={row}
                className="grid grid-cols-5 gap-4 p-4 items-center"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Other Columns */}
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded-full"></div>

                {/* Actions */}
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>

          <div className="flex gap-2">
            <div className="h-10 w-20 bg-gray-300 rounded-lg"></div>
            <div className="h-10 w-20 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminSectionSkeleton;
