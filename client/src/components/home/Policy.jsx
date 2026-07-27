import {
  exchange_icon,
  quality_icon,
  support_icon,
} from "../../assets/Index.jsx";

function Policy() {
  return (
    <section className="py-10 px-4 sm:px-8 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={exchange_icon}
          className="h-10 sm:h-12"
        />

        <p className="mt-3">
          <b>Easy Exchange Policy</b>
        </p>

        <p className="text-[#898989]">
          We offer hassle free exchange policy
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src={quality_icon}
          className="h-10 sm:h-12"
        />

        <p className="mt-3">
          <b>7 Days Return Policy</b>
        </p>

        <p className="text-[#898989]">
          We provide 7 days free return policy
        </p>
      </div>

      <div className="flex flex-col items-center text-center">
        <img
          src={support_icon}
          className="h-10 sm:h-12"
        />

        <p className="mt-3">
          <b>Best Customer Support</b>
        </p>

        <p className="text-[#898989]">
          We provide 24/7 customer support
        </p>
      </div>
    </section>
  );
}

export default Policy;