import axiosInstance from "./axiosInstance.js";

export const createOrder = (amount) => {
    return axiosInstance.post("/payment/create-order", {amount});
}

export const verifyPayment = (response) => {
    return axiosInstance.post("/payment/verify-payment", response);
}