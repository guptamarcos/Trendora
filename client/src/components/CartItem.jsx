import { hero_img } from "../assets/Index.jsx";
import { FaTrash } from "react-icons/fa";

function CartItem() {
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
            
          </p>
          
        </div>
        
      </div>

      {/* ORDER STATUS */}
      <span>
       <input type="number" defaultValue="1" min="1" max="100" placeholder="1" className="p-1 cursor-pointer border border-gray-300"/>
      </span>

      {/* TRACK ORDER BUTTON  */}
      <button className="text-red-500 cursor-pointer">
        <FaTrash size={18} />
      </button>
    </div>
  );
}

export default CartItem;
