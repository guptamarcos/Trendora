import { hero_img } from "../assets/Index";

function Hero() {
  return (
    <section className="h-[75vh] flex border-2 border-t-0 border-gray-300">
      <div className="h-full w-[50%] flex flex-col justify-center items-center">
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
      <img src={hero_img} alt="hero_image" className="h-full min-w-[50%] border-0"></img>
    </section>
  );
}

export default Hero;
