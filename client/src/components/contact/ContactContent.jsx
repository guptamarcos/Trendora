import { NavLink } from "react-router-dom";
import { contact_img } from "../../assets/Index";

const STORE_INFO = {
  address: [
    "54709 Willms Station",
    "Suite 350, Washington, USA",
  ],
  phone: "(415) 555-0132",
  email: "trendora@gmail.com",
};

function ContactContent() {
  return (
    <section className="flex flex-col lg:flex-row mt-12 mb-20 gap-8 lg:gap-12 items-center">
      {/* Left Image */}
      <img
        src={contact_img}
        alt="Contact"
        className="w-full lg:w-1/2 h-72 sm:h-96 lg:h-[70vh] object-cover rounded-lg"
      />

      {/* Right Content */}
      <div className="flex-1 text-gray-600 space-y-8 lg:space-y-10 px-4 lg:px-0">
        {/* Store Information */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
            OUR STORE
          </h2>

          <p className="leading-relaxed">
            {STORE_INFO.address[0]}
            <br />
            {STORE_INFO.address[1]}
          </p>

          <p className="mt-5">
            <span className="font-medium text-black">
              Tel:
            </span>{" "}
            {STORE_INFO.phone}
          </p>

          <p>
            <span className="font-medium text-black">
              Email:
            </span>{" "}
            {STORE_INFO.email}
          </p>
        </div>

        {/* Careers */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
            CAREERS AT TRENDORA
          </h2>

          <p className="leading-relaxed">
            Join Trendora and be part of a team shaping the
            future of fashion. We're always looking for
            creative, passionate individuals to grow with us.
          </p>

          <NavLink
            to="#"
            className="inline-block mt-6 px-6 py-3 border border-black rounded-md hover:bg-black hover:text-white transition duration-300"
          >
            Explore Jobs
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default ContactContent;