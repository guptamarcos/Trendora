import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductSchema from "../../schemas/ProductSchema.js";
import { addProduct } from "../../api/adminApi.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import ImageSchema from "../../schemas/ImageSchema.js";

function AdminAddProduct() {
  const { register, handleSubmit, formState: { errors },reset} = useForm({
    resolver: zodResolver(ProductSchema),
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  async function formData(data) {
    try {
      if (!file) {
        toast.error("Product Image is also required");
        return;
      }

      const result = ImageSchema.safeParse(file);

      if (!result.success) {
        toast.error(JSON.parse(result?.error?.message)[0]?.message);
        return;
      }

      const formData = new FormData();

      formData.append("productImage", file);

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      setLoading(true);

      await addProduct(formData);

      toast.success("Product added successfully");

      reset();
      setFile(null);
      setPreview(null);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="w-full min-h-screen flex justify-center items-center">
          <ClipLoader size={40} />
        </div>
      )}

      {!loading && (
        <main className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* HEADER */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                Add Product
              </h1>

              <p className="text-sm sm:text-base text-gray-500">
                Create and publish a new product
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(formData)}
              encType="multipart/form-data"
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 space-y-8"
            >
              {/* PRODUCT DETAILS */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  Product Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* NAME */}
                  <div className="flex flex-col gap-1">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="w-full border border-gray-200 px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                      {...register("name")}
                    />

                    {errors.name && (
                      <p className="text-xs sm:text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* CATEGORY */}
                  <div className="flex flex-col gap-1">
                    <select
                      className="w-full border border-gray-200 px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                      {...register("category")}
                    >
                      <option value="">Select category</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Boy">Boy</option>
                      <option value="Girl">Girl</option>
                    </select>

                    {errors.category && (
                      <p className="text-xs sm:text-sm text-red-500">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-4 flex flex-col gap-1">
                  <textarea
                    placeholder="Product Description"
                    rows="4"
                    className="w-full border border-gray-200 px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("description")}
                  ></textarea>

                  {errors.description && (
                    <p className="text-xs sm:text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </section>

              {/* PRICING & INVENTORY */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  Pricing & Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div className="flex flex-col gap-1">
                    <input
                      type="number"
                      placeholder="Price (₹)"
                      className="w-full border border-gray-200 px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                      {...register("price")}
                    />

                    {errors.price && (
                      <p className="text-xs sm:text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <input
                      type="number"
                      placeholder="Stock Quantity"
                      className="w-full border border-gray-200 px-4 py-2 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                      {...register("stock")}
                    />

                    {errors.stock && (
                      <p className="text-xs sm:text-sm text-red-500">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* SIZES */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  Select Sizes
                </h2>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {["S", "M", "L", "XL", "XXL"].map((size, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer text-sm sm:text-base text-gray-700"
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
                  <p className="mt-2 text-xs sm:text-sm text-red-500">
                    {errors.sizes.message}
                  </p>
                )}
              </section>

              {/* PRODUCT IMAGE */}
              <section>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  Product Image
                </h2>

                {preview && (
                  <img
                    src={preview}
                    alt="Product Preview"
                    className="mb-4 h-24 w-24 sm:h-32 sm:w-32 rounded-md border object-cover"
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
                  onChange={(e) => {
                    if (!e.target.files?.length) return;

                    const selectedFile = e.target.files[0];

                    setFile(selectedFile);
                    setPreview(URL.createObjectURL(selectedFile));
                  }}
                />
              </section>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setFile(null);
                    setPreview(null);
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </main>
      )}
    </>
  );
}

export default AdminAddProduct;
