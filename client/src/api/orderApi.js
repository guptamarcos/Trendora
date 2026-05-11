import axiosInstance from "./axiosInstance.js";


export const getUserOrder = () => {
   return axiosInstance.get("/orders");
}

export const addOrder = (data) => {
   return axiosInstance.post("/orders", data);
}
