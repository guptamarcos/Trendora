function AdminAddProduct() {
  return (
    <main className="w-full p-8 bg-gray-100 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Add Product</h1>
        <p className="text-gray-500 text-sm">
          Create and publish a new product
        </p>
      </div>

      {/* FORM */}
      <form className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        {/* PRODUCT DETAILS */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />

            <input
              type="text"
              placeholder="Category"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>

          <textarea
            placeholder="Product Description"
            className="mt-4 w-full border border-gray-200 px-4 py-2 rounded-md"
            rows="4"
          ></textarea>
        </div>

        {/* PRICING & STOCK */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Price (₹)"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />

            <input
              type="number"
              placeholder="Stock Quantity"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Image
          </h2>

          <input
            type="file"
            className="border border-gray-200 px-4 py-2 rounded-md bg-white"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 bg-white hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-black text-white"
          >
            Add Product
          </button>
        </div>
      </form>
    </main>
  );
}

export default AdminAddProduct;
