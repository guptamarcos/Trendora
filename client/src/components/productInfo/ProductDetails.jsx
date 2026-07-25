import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductInfo } from "../../api/productApi.js";
import { addToWishlist } from "../../api/wishlistApi.js";
import { addToCart } from "../../api/cartApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context/Index.jsx";
import { ClipLoader } from "react-spinners";
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
      let res = await getProductInfo(productId);
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

      const size = Object.keys(selectedSize).filter((key) => {
        return selectedSize[key] === true;
      });

      if (size.length === 0) {
        toast.error("Select at least one size");
        return;
      }

      await addToWishlist({ productId, size: size[0], quantity });
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

      const size = Object.keys(selectedSize).filter((key) => {
        return selectedSize[key] === true;
      });

      if (size.length === 0) {
        toast.error("Select at least one size");
        return;
      }

      await addToCart({ productId, size: size[0], quantity });
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-2 gap-12">
          {/*PRODUCT IMAGE */}
          <div className="flex justify-center items-start cursor-pointer hover:scale-101 transition">
            <img
              src={product?.productImage?.url}
              alt="Product"
              className="h-[70vh] w-full max-w-md object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-evenly">
            <h2 className="text-3xl font-semibold text-gray-800">
              {product?.name}
            </h2>

            {product?.rating?.average > 0 && (
              <div className="flex items-center gap-2">
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
              <span className="text-gray-500 text-base italic">
                No ratings available
              </span>
            )}

            {/* Price */}
            <h5 className="text-2xl font-bold text-black">
              ₹{product?.price || "N/A"}
            </h5>

            {product?.stock > 0 && product?.stock <= 5 && (
              <p className="text-orange-600 font-medium text-sm mt-1">
                Only {product?.stock}{" "}
                {product?.stock === 1 ? "item is" : "items are"} left
              </p>
            )}

            <hr className="border-gray-200" />

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
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

        <RelatedProducts productId={productId} />
      </div>
    </>
  );
}

export default ProductDetails;
