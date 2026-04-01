import { Subscribe } from "./Index.jsx";
import { about_img, contact_img } from "../assets/Index.jsx";
import { NavLink } from "react-router-dom";

function Contact() {
  return (
    <main>
      {/*ABOUT US HEADING  */}
      <h6 className="mt-8 flex justify-center items-center">
        <p className="text-2xl text-gray-600">
          CONTACT&nbsp;<b className="text-black">US</b>
        </p>{" "}
        &nbsp; &nbsp;
        <hr className="w-[5%] border-t-2 border-gray-500" />
      </h6>

      {/* IMAGE AND CONTENT */}
      <div className="flex my-20 gap-12 items-center">
        {/* Left Image */}
        <img src={contact_img} className="w-1/2 h-[70vh] object-cover rounded-lg" alt="contact"/>

        {/* Right Content */}
        <div className="flex-1 text-gray-600 space-y-6">
          {/* Store Info */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-4">OUR STORE</h2>
            <p className="leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>

            <p className="mt-4">
              <span className="font-medium text-black">Tel:</span> (415)
              555-0132
            </p>
            <p>
              <span className="font-medium text-black">Email:</span>{" "}
              trendora@gmail.com
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-4">
              CAREERS AT TRENDORA
            </h2>
            <p className="leading-relaxed">
              Join Trendora and be part of a team shaping the future of fashion.
              We’re always looking for creative, passionate individuals to grow
              with us.
            </p>

            <NavLink to="#" className="inline-block mt-6 px-6 py-3 border border-black text-black hover:bg-black hover:text-white transition duration-300">
              Explore Jobs
            </NavLink>
          </div>
        </div>
      </div>

      {/*SUBSCRIBE SECTION */}
      <Subscribe />
    </main>
  );
}

export default Contact;
