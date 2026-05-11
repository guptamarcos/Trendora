import axiosInstance from "./axiosInstance.js";


export const getCartItems = () => {
  return axiosInstance.get("/cart/items");
}

export const addToCart = ({productId, size, quantity}) => {
  return axiosInstance.post("/cart/items", {productId, size, quantity});
}


export const removeCartItem = (cartItemId) =>{
  return axiosInstance.delete(`/cart/items/${cartItemId}`)
}