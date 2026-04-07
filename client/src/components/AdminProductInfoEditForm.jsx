function AdminProductInfoEditForm() {
  return (
    <main className="w-full p-8 bg-gray-100 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Product</h1>
        <p className="text-gray-500 text-sm">
          Update product information and settings
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
              defaultValue="T-Shirt"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />

            <input
              type="text"
              defaultValue="Clothing"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>

          <textarea
            defaultValue="Comfortable cotton t-shirt"
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
              defaultValue="999"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />

            <input
              type="number"
              defaultValue="120"
              className="border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Product Image
          </h2>

          {/* CURRENT IMAGE */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
            <p className="text-sm text-gray-500">Current Image</p>
          </div>

          {/* CHANGE IMAGE */}
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
            Update Product
          </button>
        </div>
      </form>
    </main>
  );
}

export default AdminProductInfoEditForm;
