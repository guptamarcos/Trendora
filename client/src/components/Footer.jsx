import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <section className="flex flex-col lg:flex-row justify-between gap-8 pb-8">
        <div className="w-full lg:w-[50%]">
          <h1 className="font-semibold font-heading text-3xl sm:text-4xl">
            Trendora
          </h1>
          <p className="py-3 text-sm sm:text-base">
            Trendora brings you the latest fashion trends with quality you can
            trust and styles you’ll love. From everyday essentials to statement
            pieces, we make shopping simple and inspiring. Our mission is to
            deliver affordable fashion without compromising on style or comfort.
            Discover, shop, and redefine your wardrobe with Trendora. Your style
            journey starts here.
          </p>
        </div>

        {/* Company + Get in Touch */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
          <div>
            <h4 className="font-bold pb-2">COMPANY</h4>
            <ul className="flex flex-col">
              <li className="py-1">
                <Link to="/trendora">Home</Link>
              </li>
              <li className="py-1">
                <Link to="/trendora/about">About Us</Link>
              </li>
              <li className="py-1">
                <Link>Delivery</Link>
              </li>
              <li className="py-1">
                <Link>Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold pb-2">GET IN TOUCH</h4>
            <p className="py-1">+1-212-456-7890</p>
            <p className="py-1 break-all sm:break-normal">trendora@gmail.com</p>
          </div>
        </div>
      </section>

      <h6 className="flex justify-center items-center text-center text-sm sm:text-base py-4 border-t-2 border-gray-200 px-4">
        Copyright 2026 &copy; &nbsp;
        <Link to="/trendora">
          <b>Trendora</b>
        </Link>
        &nbsp;-&nbsp;All Rights Reserved
      </h6>
    </footer>
  );
}

export default Footer;
