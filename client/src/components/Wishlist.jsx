import { Link } from "react-router-dom";
import { WishlistItem } from "./Index.jsx";
import { getWishlistItems } from "../api/wishlistApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "./loaders/Loader.jsx";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState();
  const [loading, setLoading] = useState(false);

  async function getUserWishListItems() {
    try {
      setLoading(true);
      const res = await getWishlistItems();
      setWishlistItems(res?.data?.data?.wishlist);
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserWishListItems();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen pt-16 mb-32">
      <h2 className="text-3xl font-semibold mb-8 flex items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;WISHLIST&nbsp;
        <hr className="w-[5%] border-t-2 border-black" />
      </h2>

      <div className="flex flex-col border-t-2 border-gray-200">
        {wishlistItems?.length > 0 &&
          wishlistItems?.map((wishlistItem) => {
            return (
              <WishlistItem
                key={wishlistItem._id}
                wishlistItem={wishlistItem}
                getUserWishListItems={getUserWishListItems}
              />
            );
          })}
      </div>

      {!(wishlistItems?.length > 0) && (
        <h2 className="text-center mt-10 text-gray-500">No items added yet</h2>
      )}

      {wishlistItems?.length > 0 && (
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
    </main>
  );
}

export default Wishlist;
