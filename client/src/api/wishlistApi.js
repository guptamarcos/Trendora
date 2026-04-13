import axiosInstance from "./axiosInstance.js";

export const addToWishlist = ({productId, size, quantity}) => {
  return axiosInstance.post("/user/wishlist/addToWishlist", {productId, size, quantity});
}

export const getWishlistItems = () => {
  return axiosInstance.get("/user/wishlist/wishlistItems");
}

export const removeWishlistItem = (wishlistItemId) =>{
  return axiosInstance.delete(`/user/wishlist/${wishlistItemId}`)
}