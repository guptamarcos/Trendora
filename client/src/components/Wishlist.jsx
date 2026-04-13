// import { WishlistItem } from "./Index.jsx";
import { Link } from "react-router-dom";
import { WishlistItem } from "./Index.jsx";
import { getWishlistItems } from "../api/wishlistApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState();

  async function getUserWishListItems() {
    try {
      const res = await getWishlistItems();
      setWishlistItems(res?.data?.data?.wishlist);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  }

  useEffect(() => {
    getUserWishListItems();
  }, []);

  const isWishlistEmpty = wishlistItems?.length === 0;

  return (
    <section className="min-h-screen pt-16 mb-32">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;WISHLIST&nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      {/* WISHLIST ITEMS */}
      <div className="flex flex-col border-t-2 border-gray-200">
        {wishlistItems?.map((wishlistItem) => {
          return (
            <WishlistItem
              key={wishlistItem._id}
              wishlistItem={wishlistItem}
              getUserWishListItems={getUserWishListItems}
            />
          );
        })}
      </div>
      
      {/* EMPTY STATE */}
      {isWishlistEmpty && (
        <h2 className="text-center mt-10 text-gray-500">
          No items added yet
        </h2>
      )}

      {/* ACTION SECTION */}
      {!isWishlistEmpty && (
        <div className="flex mt-10">
          <span className="flex-1"></span>

          <div className="flex-1 text-right">
            <Link
              to="/trendora/collection"
              className="px-8 py-2 border border-black text-black hover:bg-black hover:text-white transition"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Wishlist;
