// import { WishlistItem } from "./Index.jsx";
import { Link } from "react-router-dom";
import { WishlistItem } from "./Index.jsx";


function Wishlist() {
  return (
    <section className="min-h-screen pt-16 mb-32">

      {/* HEADING */}
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;WISHLIST&nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      {/* WISHLIST ITEMS */}
      <div className="flex flex-col border-t-2 border-gray-200">
        <WishlistItem />
        <WishlistItem />
      </div>

      {/* ACTION SECTION */}
      <div className="flex mt-10">
        <span className="flex-1"></span>

        <div className="flex-1 text-right">
          <Link
            to="/trendora/products"
            className="px-8 py-2 border border-black text-black hover:bg-black hover:text-white transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Wishlist;