import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductInfo, getRelatedProducts} from "../api/productApi.js";
import { addToWishlist } from "../api/wishlistApi.js";
import { addToCart } from "../api/cartApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Product } from "./Index.jsx";
import { useContext } from "react";
import { UserContext } from "../context/Index.jsx";

function SizeBox({ text, selectedSize, setSelectedSize }) {

  function handleSelectSize({ text }) {
    const newSelectedSize = Object.keys(selectedSize).reduce((acc, val) => {
      {
        val === text ? (acc[val] = true) : (acc[val] = false);
      }
      return acc;
    }, {});

    setSelectedSize(newSelectedSize);
  }

  return (
    <>
      {!selectedSize[text] && (
        <span
          onClick={() => handleSelectSize({ text })}
          className="flex justify-center items-center cursor-pointer px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
        >
          {text}
        </span>
      )}

      {selectedSize[text] && (
        <span className="flex justify-center items-center cursor-pointer px-4 py-2 rounded-md border border-gray-300 text-white bg-black ">
          {text}
        </span>
      )}
    </>
  );
}

function RelatedProducts({ relatedProducts }) {
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
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { user, getUser } = useContext(UserContext);
  
  async function getProduct() {
    try {
      let res = await getProductInfo(productId);
      setProduct(res?.data?.data[0]);
      const sizes = res?.data?.data[0]?.sizes;
      const obj = sizes?.reduce((acc, val) => {
        acc[val] = false;
        return acc;
      }, {});

      setSelectedSize(obj);
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

  async function addInWishlist(){
    try{
      
      if(!user){
        toast.error("Please log in to add items to your wishlist.");
        return ;
      }

      const size = Object.keys(selectedSize).filter((key)=>{
        return selectedSize[key] === true;
      })
      
      if(size.length === 0){
        toast.error("Select at least one size");
        return;
      }
      
      await addToWishlist({ productId, size : size[0], quantity});
      toast.success("Product added in wishlist successfully");
      getUser();
    }catch(err){
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
   
  }

  async function addInCart(){
    try{
      if(!user){
        toast.error("Please log in to add items to your cart.");
        return ;
      }

      const size = Object.keys(selectedSize).filter((key)=>{
        return selectedSize[key] === true;
      })
      
      if(size.length === 0){
        toast.error("Select at least one size");
        return;
      }
      
      await addToCart({ productId, size : size[0], quantity});
      toast.success("Product added in cart successfully");
      getUser();
    }catch(err){ 
      const message = err?.response?.data?.message || "Something went wrong";
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
        <div className="flex justify-center items-start cursor-pointer hover:scale-101 transition">
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
                product?.sizes?.map((sizeVal) => (
                  <SizeBox key={sizeVal} text={sizeVal} selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                  />
                ))}

            </div>
          </div>

          {/* QUANTITY */}
          <div>
            <h6 className="font-semibold text-gray-700 mb-3">Quantity</h6>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="cursor-pointer px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-200"
              >
                -
              </button>

              <span className="text-lg font-medium">{quantity}</span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="cursor-pointer px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={addInCart}
              className="cursor-pointer px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition shadow-sm"
            >
              ADD TO CART
            </button>

            <button 
              onClick={addInWishlist}
              className="cursor-pointer px-6 py-3 border border-black text-black rounded-md hover:bg-black hover:text-white transition">
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
