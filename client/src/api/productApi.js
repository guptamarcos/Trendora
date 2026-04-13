import axiosInstance from "./axiosInstance.js";

export const addProductInfo = (data) => {
  return axiosInstance.post("/product/addProduct", data);
};

export const getAllProductInfo = () => {
  return axiosInstance.get("/product/getAllProduct");
};

export const deleteProduct = (productId) =>{
  return axiosInstance.delete(`/product/${productId}`);
}

export const getProductInfo = (productId) =>{
  return axiosInstance.get(`/product/${productId}`);
}

export const editProductInfo = (data, productId) =>{
  return axiosInstance.patch(`/product/${productId}`, data);
}

export const latestCollections = () =>{
  return axiosInstance.get("/product/latestCollections");
}

export const getRelatedProducts = (category) =>{
  return axiosInstance.get(`/product/getRelatedProducts/${category}`);
}

export const getBestSeller = () => {
  return axiosInstance.get("/product/getBestSeller");
}



