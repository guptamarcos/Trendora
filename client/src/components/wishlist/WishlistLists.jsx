import WishlistItem from "./WishlistItem.jsx";
import { Link } from "react-router-dom";

function WishlistLists({ wishlistItems, getUserWishListItems }) {
  return (
    <main className="min-h-screen pt-10 sm:pt-16 mb-20 sm:mb-32">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 flex items-center">
        <span className="text-gray-600">YOUR</span>&nbsp;WISHLIST&nbsp;
        <hr className="w-10 sm:w-[5%] border-t-2 border-black" />
      </h2>

      <div className="flex flex-col border-t-2 border-gray-200">
        {wishlistItems?.length > 0 &&
          wishlistItems.map((wishlistItem) => (
            <WishlistItem
              key={wishlistItem._id}
              wishlistItem={wishlistItem}
              getUserWishListItems={getUserWishListItems}
            />
          ))}
      </div>

      {!(wishlistItems?.length > 0) && (
        <h2 className="text-center mt-10 text-gray-500 text-lg">
          No items added yet
        </h2>
      )}

      {wishlistItems?.length > 0 && (
        <div className="flex flex-col lg:flex-row mt-10">
          <span className="hidden lg:block flex-1"></span>

          <div className="w-full lg:flex-1 lg:text-right">
            <Link
              to="/trendora/collections"
              className="inline-block w-full sm:w-auto text-center px-8 py-3 border border-black text-black hover:bg-black hover:text-white transition"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

export { WishlistLists };