function TableHead() {
  return (
    <thead className="bg-gray-50 text-gray-600 text-lg">
      <tr>
        <th className="px-4 py-3">Product</th>
        <th className="px-4 py-3">Price</th>
        <th className="px-4 py-3">Stock</th>
        <th className="px-2 py-3">Category</th>
        <th className="px-6 py-3 text-right">Action</th>
      </tr>
    </thead>
  );
}

function TableRow({product,price,stock,category,status}) {
  return (
    <tr className="border-t border-gray-200">
      {/* PRODUCT */}
      <td className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
        <span className="font-medium text-gray-800">{product}</span>
      </td>

      {/* PRICE */}
      <td className="px-4 py-3">₹{price}</td>

      {/* STOCK */}
      <td className="px-4 py-3">{stock}</td>

      {/* CATEGORY */}
      <td className="px-4 py-3">{category}</td>

      {/* ACTION */}
      <td className="px-4 py-3 text-right">
        <button className="text-sm px-3 py-1 border border-red-200 text-red-600 rounded-md">
          Delete
        </button>
      </td>
    </tr>
  );
}

function AdminProductInfo() {
  return (
    <main className="w-full p-8 bg-gray-100 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Products</h1>
        <p className="text-gray-500 text-base">Manage and monitor all products</p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex justify-between items-center gap-4">
        <div className="h-12 flex items-center gap-1">
          <input
            type="text"
            placeholder="Search users..."
            className="h-full w-full max-w-sm border px-4 border-gray-200 rounded-md focus:outline-none bg-white"
          />
          <button className="h-full flex justify-center cursor-pointer items-center px-6 rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-100">
            Search
          </button>
        </div>

        <select className="border border-gray-200 px-3 py-2 rounded-md text-gray-700 bg-white">
          <option>All Categories</option>
          <option>Clothing</option>
          <option>Electronics</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-left">
          {/* HEAD */}
          <TableHead />

          {/* BODY */}
          <tbody className="text-gray-700">
            <TableRow product="T-shirt" price="999" stock={120} category="Men" status="Active"/>
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4 text-sm text-gray-600">
        <p>
          Showing <span className="font-medium text-gray-800">1–10</span> of{" "}
          <span className="font-medium text-gray-800">50</span> products
        </p>

        <button className="px-4 py-1.5 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100">
          Show more
        </button>
      </div>
    </main>
  );
}

export default AdminProductInfo;
