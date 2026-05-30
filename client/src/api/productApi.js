import axiosInstance from "./axiosInstance.js";


export const getAllProducts = () =>{
  return axiosInstance.get("/products");
}

export const latestCollections = () =>{
  return axiosInstance.get("/products/latest");
}

export const bestSellers = () => {
  return axiosInstance.get("/products/best-sellers");
}

export const getRelatedProducts = (productId) =>{
  return axiosInstance.get(`/products/${productId}/related`);
}

export const getProductInfo = (productId) =>{
  return axiosInstance.get(`/products/${productId}`);
}






