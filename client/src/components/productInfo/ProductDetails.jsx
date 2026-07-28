import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductInfo } from "../../api/productApi.js";
import { addToWishlist } from "../../api/wishlistApi.js";
import { addToCart } from "../../api/cartApi.js";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../context/Index.jsx";
import RelatedProducts from "./RelatedProducts.jsx";
import ProductActions from "./ProductActions.jsx";

function ProductDetails({ setLoading, setProductId, refreshProduct }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const { user, getUser } = useContext(UserContext);

  async function getProduct() {
    try {
      const res = await getProductInfo(productId);

      setProduct(res?.data?.data);

      setProductId(productId);

      const sizes = res?.data?.data?.sizes;

      const obj = sizes?.reduce((acc, val) => {
        acc[val] = false;
        return acc;
      }, {});

      setSelectedSize(obj);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function addInWishlist() {
    try {
      if (!user) {
        toast.error("Please log in to add items to your wishlist.");
        return;
      }

      const size = Object.keys(selectedSize).filter((key) => selectedSize[key]);

      if (size.length === 0) {
        toast.error("Select at least one size");
        return;
      }

      await addToWishlist({
        productId,
        size: size[0],
        quantity,
      });

      toast.success("Product added in wishlist successfully");

      getUser();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  }

  async function addInCart() {
    try {
      if (!user) {
        toast.error("Please log in to add items to your cart.");
        return;
      }

      const size = Object.keys(selectedSize).filter((key) => selectedSize[key]);

      if (size.length === 0) {
        toast.error("Select at least one size");
        return;
      }

      await addToCart({
        productId,
        size: size[0],
        quantity,
      });

      toast.success("Product added in cart successfully");

      getUser();
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  }

  useEffect(() => {
    getProduct();
  }, [productId, refreshProduct]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* PRODUCT IMAGE */}
          <div className="flex justify-center items-start cursor-pointer transition hover:scale-[1.01]">
            <img
              src={product?.productImage?.url}
              alt="Product"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto lg:h-[70vh] object-cover rounded-xl shadow-md"
            />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col gap-5 lg:justify-evenly">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {product?.name}
            </h2>

            {product?.rating?.average > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = product?.rating?.average || 0;

                    if (star <= Math.floor(rating)) {
                      return <FaStar key={star} className="text-yellow-400" />;
                    }

                    if (star - rating <= 0.5) {
                      return (
                        <FaStarHalfAlt key={star} className="text-yellow-400" />
                      );
                    }

                    return <FaStar key={star} className="text-gray-300" />;
                  })}
                </div>

                <span className="text-gray-600 text-sm font-medium">
                  {product?.rating?.average.toFixed(1)}
                </span>

                <span className="text-gray-400 text-sm">
                  ({product?.rating?.count || 0} reviews)
                </span>
              </div>
            )}

            {product?.rating?.average === 0 && (
              <span className="text-gray-500 text-sm sm:text-base italic">
                No ratings available
              </span>
            )}

            <h5 className="text-2xl sm:text-3xl font-bold text-black">
              ₹{product?.price || "N/A"}
            </h5>

            {product?.stock > 0 && product?.stock <= 5 && (
              <p className="text-orange-600 font-medium text-sm">
                Only {product?.stock}{" "}
                {product?.stock === 1 ? "item is" : "items are"} left
              </p>
            )}

            <hr className="border-gray-200" />

            <p className="text-gray-600 text-sm sm:text-base leading-7">
              {product?.description}
            </p>

            <ProductActions
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              setQuantity={setQuantity}
              quantity={quantity}
              addInCart={addInCart}
              addInWishlist={addInWishlist}
            />
          </div>
        </section>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <RelatedProducts productId={productId} />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
