import axiosInstance from "./axiosInstance.js";


// GET USER WISHLIST 
export const getWishlistItems = () => {
  return axiosInstance.get("/wishlist/items");
}

// ADD ITEM IN WISHLIST
export const addToWishlist = ({productId, size, quantity}) => {
  return axiosInstance.post("/wishlist/items", {productId, size, quantity});
}

// REMOVE ITEM FROM THE WISHLIST
export const removeWishlistItem = (wishlistItemId) =>{
  return axiosInstance.delete(`/wishlist/items/${wishlistItemId}`)
}