import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer >
      <section className="flex justify-between pb-8">
        <div className="w-[50%]">
          <h1 className="font-semibold font-heading text-4xl">Trendora</h1>
          <p className="py-3">
            Trendora brings you the latest fashion trends with quality you can
            trust and styles you’ll love. From everyday essentials to statement
            pieces, we make shopping simple and inspiring. Our mission is to
            deliver affordable fashion without compromising on style or comfort.
            Discover, shop, and redefine your wardrobe with Trendora. Your style
            journey starts here.
          </p>
        </div>
        <div>
            <h4 className="font-bold pb-2">COMPANY</h4>
            <ul className="flex flex-col">
              <li className="py-1"><Link to="/trendora">Home</Link></li>
              <li className="py-1"><Link to="/trendora/about">About Us</Link></li>
              <li className="py-1"><Link>Delivery</Link></li>
              <li className="py-1"><Link>Privacy Policy</Link></li>
            </ul>
        </div>
        <div>
            <h4 className="font-bold pb-2">GET IN TOUCH</h4>
            <p className="py-1">+1-212-456-7890</p>
            <p className="py-1">trendora@gmail.com</p>
        </div>
      </section>
      <h6 className="flex justify-center items-center py-4 border-t-2 border-gray-200">
        Copyright 2026 &copy; &nbsp;<Link to="/trendora"><b>Trendora</b></Link>&nbsp;-&nbsp;All Rights Reserved
      </h6>
    </footer>
  );
}

export default Footer;
