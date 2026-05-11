import axiosInstance from "./axiosInstance.js";

export const getCurrentUser = () => {
  return axiosInstance.get("/users/me");
}

export const updateProfileInfo = (data) =>{
  return axiosInstance.patch("/users/me", data)
}

export const updateProfilePassword = (data) =>{
  return axiosInstance.patch("/users/me/password", data);
}

export const uploadProfileImage = ( data ) =>{
  return axiosInstance.patch("/users/me/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
}
