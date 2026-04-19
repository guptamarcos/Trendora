import axiosInstance from "./axiosInstance.js";

export const addOrder = (data) => {
   return axiosInstance.post("/orders", data);
}

export const getUserOrder = () => {
   return axiosInstance.get("/orders/getUserOrder");
}

export const getAllOrder = () => {
   return axiosInstance.get("/orders/getAllOrder");
}