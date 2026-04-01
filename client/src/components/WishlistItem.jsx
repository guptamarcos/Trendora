import { hero_img } from "../assets/Index";

function WishlistItem() {
  return (
    <div className="w-full h-[18vh] flex justify-between items-center border-0 border-b-2 border-gray-200">

      {/* ORDER BASIC INFORMATION */}
      <div className="h-full flex items-center gap-4 py-4">
        {/* PRODUCT IMAGE  */}
        <img src={hero_img} className="h-full object-cover rounded-sm "></img>

        {/* PRODUCT INFORMATION */}
        <div className="h-full flex flex-col ">
          <h6 className="font-semibold text-lg text-gray-700">
            Men Round Neck Pure Cotton T-Shirt
          </h6>
          <p className="w-full flex items-center gap-8 mt-4">

            <span>$149</span>
            <p className="text-gray-500 text-base">Size: M</p>
            <p className="text-gray-500 text-base">Quantity: 1</p>
            
          </p>
          
        </div>
        
      </div>


      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">

        {/* Add to Cart */}
        <button className="px-4 py-1.5 border border-black text-sm hover:bg-black hover:text-white transition cursor-pointer">
          Add to Cart
        </button>

        {/* Remove */}
        <button className="text-red-500 text-sm hover:underline cursor-pointer">
          Remove
        </button>

      </div>

    </div>
  );
}

export default WishlistItem;