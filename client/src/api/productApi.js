import axiosInstance from "./axiosInstance.js";

export const addProductInfo = (data) => {
  return axiosInstance.post("/product/addProduct", data);
};

export const getAllProductInfo = () => {
  return axiosInstance.get("/product/getAllProduct");
};
