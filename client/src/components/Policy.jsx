import {exchange_icon, quality_icon, support_icon} from "../assets/Index.jsx";

function Policy() {
  return (
    <section className="h-[40vh] py-4 px-24 flex justify-between items-center">
      <div className="flex flex-col items-center">
        <img src={exchange_icon} className="h-[5vh]"></img>
        <p className="text-center"><b>Easy Exchange Policy</b></p>
        <p className="text-[#898989]">We offer hassle free  exchange policy</p>
      </div>
      <div className="flex flex-col items-center">
       <img src={quality_icon} className="h-[5vh]"></img>
        <p ><b>7 Days return Policy</b></p>
        <p className="text-[#898989]">We provide 7 days free return policy </p>
      </div>
      <div className="flex flex-col items-center">
       <img src={support_icon} className="h-[5vh]"></img>
        <p><b>Best Customer Support</b></p>
        <p className="text-[#898989]">We provide 24/7 customer support</p>
      </div>
    </section>
  );
}

export default Policy;
