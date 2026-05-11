import axiosInstance from "./axiosInstance.js";

export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

export const login = (data) => {
  return axiosInstance.post("/auth/login", data);
};

export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};

