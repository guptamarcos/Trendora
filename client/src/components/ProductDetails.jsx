import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductInfo, getRelatedProducts } from "../api/productApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Product } from "./Index.jsx";

function SizeBox({ text }) {
  return (
    <span className="flex justify-center items-center cursor-pointer px-4 py-2 rounded-md bg-gray-100 border border-gray-300 hover:bg-black hover:text-white transition">
      {text}
    </span>
  );
}

function RelatedProducts({relatedProducts}) {
  return (
    <section className="mt-20">
      <h2 className="text-3xl font-semibold mb-10 flex items-center justify-center">
        <span className="text-3xl text-gray-600">RELATED</span>&nbsp;PRODUCTS
        <hr className="w-16 ml-3 border-t-2 border-black" />
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {relatedProducts?.length > 0 &&
          relatedProducts.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
      </div>
    </section>
  );
}

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  async function getProduct() {
    try {
      let res = await getProductInfo(productId);
      setProduct(res?.data?.data[0]);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  async function getRelatedProductsInfo() {
    try {
      const category = product?.category || "Boys";
      const res = await getRelatedProducts(category);
      setRelatedProducts(res?.data?.data);
    } catch (err) {
      const message = err?.response?.data?.message;
      toast.error(message);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId]);

  useEffect(() => {
    if (product?.category) {
      getRelatedProductsInfo();
    }
  }, [product?.category]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* ================= PRODUCT SECTION ================= */}
      <section className="grid md:grid-cols-2 gap-12">

        {/*PRODUCT IMAGE */}
        <div className="flex justify-center items-start">
          <img
            src={product?.productImage?.url}
            alt="Product"
            className="h-[70vh] w-full max-w-md object-cover rounded-xl shadow-md"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-col justify-evenly">
          <h2 className="text-3xl font-semibold text-gray-800">
            {product?.name}
          </h2>

          {/* RATINGS */}
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-gray-300" />
            <span className="text-gray-600 text-sm">
              {product?.rating?.average || "No ratings"}
            </span>
          </div>

          {/* Price */}
          <h5 className="text-2xl font-bold text-black">
            ₹{product?.price || "N/A"}
          </h5>

          <hr className="border-gray-200" />

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          {/* Sizes */}
          <div>
            <h6 className="font-semibold text-gray-700 mb-3">Select Size</h6>

            <div className="flex flex-wrap gap-3">
              {product?.sizes?.length > 0 &&
                product?.sizes.map((sizeVal) => (
                  <SizeBox key={sizeVal} text={sizeVal} />
                ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <h6 className="font-semibold text-gray-700 mb-3">Quantity</h6>

            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQty}
                className="cursor-pointer px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-200"
              >
                -
              </button>

              <span className="text-lg font-medium">{quantity}</span>

              <button
                onClick={increaseQty}
                className="cursor-pointer px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() =>
                console.log("Add to cart:", product, "Qty:", quantity)
              }
              className="cursor-pointer px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition shadow-sm"
            >
              ADD TO CART
            </button>

            <button className="cursor-pointer px-6 py-3 border border-black text-black rounded-md hover:bg-black hover:text-white transition">
              ADD TO WISHLIST
            </button>
          </div>
        </div>
      </section>

      <RelatedProducts relatedProducts={relatedProducts} />
    </div>
  );
}

export default ProductDetails;
