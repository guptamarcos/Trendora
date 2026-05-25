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

export const oauthLogin = (token) => {
  return axiosInstance.post("/auth/google", { token });
};

export const verifyOtp = (email, otp) =>{
  return axiosInstance.post("/auth/otp/verify", {email, otp});
}

export const resendOtp = (email) =>{
  return axiosInstance.post("/auth/otp/resend", {email});
}
