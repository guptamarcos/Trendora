import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductSchema from "../schemas/ProductSchema.js";
import { addProductInfo } from "../api/productApi.js";
import { useState } from "react";
import { toast } from "react-toastify";

function AdminAddProduct() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(ProductSchema),
  });

  const [file, setFile] = useState(null);

  async function formData(data) {
    try {
      if (!file) {
        toast.error("Product Image is also required");
        return;
      }

      const formData = new FormData();
      formData.append("productImage", file);

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await addProductInfo(formData);
      toast.success("Product added successfully");
      reset();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  return (
    <main className="w-full min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Add Product
          </h1>
          <p className="text-gray-500 text-sm">
            Create and publish a new product
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(formData)}
          encType="multipart/form-data"
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-8"
        >
          {/* PRODUCT DETAILS */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* NAME */}
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* CATEGORY */}
              <div className="flex flex-col gap-1">
                <select
                  className="border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  {...register("category")}
                >
                  <option value="">Select category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Boy">Boy</option>
                  <option value="Girl">Girl</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 flex flex-col gap-1">
              <textarea
                placeholder="Product Description"
                className="w-full border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </section>

          {/* PRICING & STOCK */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  placeholder="Price (₹)"
                  className="border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  className="border border-gray-200 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  {...register("stock")}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* SIZES */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Select Sizes
            </h2>

            <div className="flex flex-wrap gap-4">
              {["S", "M", "L", "XL", "XXL"].map((size, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    value={size}
                    {...register("sizes")}
                  />
                  {size}
                </label>
              ))}
            </div>

            {errors.sizes && (
              <p className="text-red-500 text-sm mt-2">
                {errors.sizes.message}
              </p>
            )}
          </section>

          {/* IMAGE */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Product Image
            </h2>

            <input
              type="file"
              accept="image/*"
              className="border border-gray-200 px-4 py-2 rounded-md bg-white"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </section>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default AdminAddProduct;