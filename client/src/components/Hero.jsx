import { hero_img } from "../assets/Index";

function Hero() {
  return (
    <section className="flex border-2 border-t-0 border-gray-300">
      <div className="w-[50%] flex flex-col justify-center items-center">
        <div>
          <div className="font-outfit flex items-center">
            <hr className="w-[20%] border-t-2 border-black" />
            &nbsp; OUT BESTSELLERS
          </div>
          <p className="font-prata text-5xl py-[0.5rem] ">Latest Arrivals</p>
          <div className="font-outfit text-left text-sm flex items-center">
            SHOP NOW &nbsp;
            <hr className="w-[20%] border-t-2 border-black" />
          </div>
        </div>
      </div>
      <img src={hero_img} className="h-[60%] w-[50%]"></img>
    </section>
  );
}

export default Hero;
