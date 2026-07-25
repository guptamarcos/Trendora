import { useState, useEffect } from "react";
import { deleteProduct, getAllProduct } from "../../api/adminApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AdminSectionSkeleton } from "../../components/skeletons/Index.jsx";

function TableHead() {
  const headings = ["Product", "Price", "Stock", "Category"];
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headings.map((heading, idx) => {
          return (
            <th
              key={idx}
              className="px-6 py-4 text-left text-base font-semibold text-gray-700"
            >
              {heading}
            </th>
          );
        })}

        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableRow({ product, productInfo }) {
  const navigate = useNavigate();

  async function handleDelete() {
    toast.warning(
      "Delete functionality is disabled in this demo to prevent accidental data loss.",
    );
    return;
    try {
      await deleteProduct(product._id);

      toast.success("Product deleted successfully");

      productInfo();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition duration-200">
      {/* PRODUCT */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src={product?.productImage?.url || ""}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover bg-gray-100 border border-gray-200"
          />

          <div>
            <p className="font-medium text-gray-800">{product.name}</p>

            <p className="text-sm text-gray-500">
              Product ID: {product._id.slice(-6)}
            </p>
          </div>
        </div>
      </td>

      {/* PRICE */}
      <td className="px-6 py-4 font-medium text-gray-700">₹{product.price}</td>

      {/* STOCK */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {product.stock}
        </span>
      </td>

      {/* CATEGORY */}
      <td className="px-6 py-4">
        <span className="capitalize text-gray-700 font-medium">
          {product.category}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-3">
          <button
            onClick={handleDelete}
            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(`/trendora/admin/${product._id}/edit`)}
            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

function AdminProductInfo() {
  const [products, setProducts] = useState([]);
  const [matchedProductsCount, setMatchedProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  // search + filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await getAllProduct(search, categoryFilter, limit);

      setMatchedProductsCount(res?.data?.matchedProductsCount);

      const productData = res?.data?.data || [];

      setProducts(productData);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [limit, categoryFilter]);

  if (loading) {
    return <AdminSectionSkeleton />;
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <p className="text-gray-500">Manage and monitor all products</p>
        </div>

        {/* KEEP SAME SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setLimit(10);
                setSearch(e.target.value);
              }}
              className="h-11 w-full md:w-72 border border-gray-200 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
            />

            <button
              onClick={() => fetchProducts()}
              className="cursor-pointer h-11 px-6 rounded-md border border-gray-200 text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              Search
            </button>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => {
              setLimit(10);
              setCategoryFilter(e.target.value);
            }}
            className="h-11 border border-gray-200 px-4 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="boy">Boys</option>
            <option value="girl">Girls</option>
          </select>
        </div>

        {/* PRODUCT COUNT */}
        <div>
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {products?.length}
            </span>{" "}
            out of{" "}
            <span className="font-semibold text-gray-800">
              {matchedProductsCount || " "}
            </span>{" "}
            products
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <TableHead />

              <tbody>
                {products?.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <TableRow
                      key={product._id}
                      product={product}
                      productInfo={fetchProducts}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-5">
          <button
            onClick={() => setLimit((prev) => prev - 10)}
            className={`cursor-pointer w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition ${products?.length > 10 ? "" : "invisible"}`}
          >
            Show Less
          </button>

          <button
            onClick={() => {
              setLimit((prev) => prev + 10);
            }}
            className={`cursor-pointer w-full sm:w-auto px-5 py-3 rounded-xl bg-black text-white hover:opacity-90 transition ${products?.length < matchedProductsCount ? "" : "invisible"}`}
          >
            Show More
          </button>
        </div>
      </div>
    </main>
  );
}

export default AdminProductInfo;
