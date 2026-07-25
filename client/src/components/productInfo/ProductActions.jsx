import SizeBox from "./SizeBox.jsx"

function ProductActions({
  product, selectedSize, setSelectedSize, setQuantity, quantity, addInCart, addInWishlist,
}) {
  return (
    <>
      {product?.stock === 0 && (
        <div className="min-h-30 ">
          <span className="px-4 py-2 w-max bg-red-50 text-red-600 border border-red-200 rounded-md font-medium">
            Out of Stock
          </span>
        </div>
      )}

      {product?.stock > 0 && (
        <>
          <div>
            <h6 className="font-semibold text-gray-700 mb-3">Select Size</h6>

            <div className="flex flex-wrap gap-3">
              {product?.sizes?.length > 0 &&
                product?.sizes?.map((sizeVal) => (
                  <SizeBox
                    key={sizeVal}
                    text={sizeVal}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                  />
                ))}
            </div>
          </div>
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
                onClick={() => {
                  if (!(product?.stock > quantity)) {
                    toast.error(`Only ${product?.stock} items are available`);
                    return;
                  }
                  setQuantity((prev) => prev + 1);
                }}
                className="cursor-pointer px-3 py-1 border border-gray-400 rounded-md hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={addInCart}
              className="cursor-pointer px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition shadow-sm"
            >
              ADD TO CART
            </button>

            <button
              onClick={addInWishlist}
              className="cursor-pointer px-6 py-3 border border-black text-black rounded-md hover:bg-black hover:text-white transition"
            >
              ADD TO WISHLIST
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ProductActions;
