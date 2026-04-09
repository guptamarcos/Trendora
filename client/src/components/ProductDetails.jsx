import { hero_img } from "../assets/Index.jsx";
import { FaStar } from "react-icons/fa";

function SizeBox({ text }) {
  return (
    <span className="flex justify-center items-center cursor-pointer px-4 py-1 bg-gray-100 border-1 border-gray-400">
      {text}
    </span>
  );
}


function ProductDetails() {
  return (
    <section className="flex my-8 py-4 gap-8">
      {/* PRODUCT IMAGES */}
      <div className="flex-1">
        <img src={hero_img} alt="Product Image" className="h-[75vh]"></img>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="px-4 flex flex-col justify-center flex-1">
        <h2 className="font-semibold text-3xl">
          Men Round Neck Pure Cotton T-shirt
        </h2>
        <div className="flex items-center gap-2">
          <FaStar color="gold" />
          <FaStar color="gold" />
          <FaStar color="gold" />
          <FaStar color="gold" />
          <FaStar color="gray" />
          <span>(122)</span>
        </div>
        <h5 className="font-semibold text-2xl my-4">$149</h5>
        <p>
          A T-shirt is a lightweight garment, usually made from knitted fabric.
          It is designed as a pullover, meaning it is worn by slipping it over
          the head. The shirt typically has a close-fitting structure that
          comfortably follows the body shape. It features a round neckline,
          often referred to as a crew neck. T-shirts usually have short sleeves,
          making them suitable for casual wear. They can be worn either as an
          undershirt or as an outer garment.
        </p>
        <h6 className="font-semibold text-gray-700 mb-2 py-4">Select Size</h6>
        <div className="w-[30%] grid grid-cols-5 gap-2">
          <SizeBox text="S"/>
          <SizeBox text="M"/>
          <SizeBox text="L"/>
          <SizeBox text="XL"/>
          <SizeBox text="XXL"/>
        </div>
        <button className=" my-6 py-2 px-4 text-gray-100 bg-black cursor-pointer">
          ADD TO CART
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;
