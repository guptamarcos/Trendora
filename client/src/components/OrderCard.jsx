import { hero_img } from "../assets/Index.jsx";
import { FaCircle } from "react-icons/fa";

function OrderCard() {
  return (
    <div className="w-full h-[18vh] flex justify-between items-center border-0 border-b-2 border-gray-200">
      
      {/* ORDER BASIC INFORMATION */}
      <div className="h-full flex items-center gap-4 h-full py-4">

        {/* PRODUCT IMAGE  */}
        <img src={hero_img} className="h-full w-[5vw]"></img>

        {/* PRODUCT INFORMATION */}
        <div className="h-full flex flex-col justify-between">

          <h6 className="font-semibold text-lg text-gray-700">Men Round Neck Pure Cotton T-Shirt</h6>
          <p className="w-full flex justify-between">
            <span>$149</span>
            <span><b>Quantity: </b>1 </span> 
            <span><b>Size: </b>L </span>
          </p>
          <p> <b>Date: &nbsp;</b>25 May 2026</p>

        </div>

      </div>

      {/* ORDER STATUS */}
      <span className="flex items-center gap-2">
        <FaCircle color="green" size={14} />
        Ready to Ship
      </span>

      {/* TRACK ORDER BUTTON  */}
      <button className="border px-4 py-2 text-gray-800 cursor-pointer">Track Order</button>
    </div>
  );
}

export default OrderCard;
