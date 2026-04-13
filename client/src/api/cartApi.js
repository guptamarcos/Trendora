import axiosInstance from "./axiosInstance.js";

export const addToCart = ({productId, size, quantity}) => {
  return axiosInstance.post("/user/cart/addToCart", {productId, size, quantity});
}
export const getCartItems = () => {
  return axiosInstance.get("/user/cart/cartItems");
}

export const removeCartItem = (cartItemId) =>{
  return axiosInstance.delete(`/user/cart/${cartItemId}`)
}