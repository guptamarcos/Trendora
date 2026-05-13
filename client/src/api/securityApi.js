import axiosInstance from "./axiosInstance.js";


export const getCsurfToken = () => {
    return axiosInstance.get("/security/csrf-token");
}