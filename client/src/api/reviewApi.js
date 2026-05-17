import axiosInstance from "./axiosInstance.js";


export const getAllReviews = (productId) =>{
  return axiosInstance.get(`/products/${productId}/reviews`);
}

export const addReview = (productId, {content,rating}) =>{
  return axiosInstance.post(`/products/${productId}/reviews`, {content,rating});
}

export const deleteReview = (productId, reviewId) => {
  return axiosInstance.delete(`/products/${productId}/reviews/${reviewId}`);
}