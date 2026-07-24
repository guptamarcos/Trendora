import { getWishlistItems } from "../api/wishlistApi.js";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/loaders/Loader.jsx";
import { WishlistLists } from "../components/wishlist/WishlistLists.jsx";

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
    <WishlistLists wishlistItems={wishlistItems} getUserWishListItems={getUserWishListItems}/>
  );
}

export default Wishlist;
