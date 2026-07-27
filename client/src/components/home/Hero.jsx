import { hero_img } from "../../assets/Index";

function Hero() {
  return (
    <section className="flex flex-col-reverse lg:flex-row lg:min-h-[75vh] border-2 border-t-0 border-gray-300">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-10 px-6">
        <div>
          <div className="font-outfit flex items-center text-sm sm:text-base">
            <hr className="w-12 sm:w-[20%] border-t-2 border-black" />
            &nbsp; OUR BESTSELLERS
          </div>

          <p className="font-prata text-3xl sm:text-4xl lg:text-5xl py-2">
            Latest Arrivals
          </p>

          <div className="font-outfit text-sm flex items-center">
            SHOP NOW &nbsp;
            <hr className="w-12 sm:w-[20%] border-t-2 border-black" />
          </div>
        </div>
      </div>

      <img
        src={hero_img}
        alt="hero_image"
        className="w-full lg:w-1/2 h-72 sm:h-96 lg:h-auto object-cover"
      />
    </section>
  );
}

export default Hero;