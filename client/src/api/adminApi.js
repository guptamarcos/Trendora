import axiosInstance from "./axiosInstance.js";

export const getAllUserInfo = () => {
  return axiosInstance.get("/admin/users");
};

export const getAllOrder = () => {
  return axiosInstance.get("/admin/orders");
} 
 
export const getDashboardInfo = () => {
  return axiosInstance.get("/admin/dashboard");
};

export const addProduct = (data) => {
  return axiosInstance.post("/admin/products", data);
};

export const editProduct = (data, productId) =>{
  return axiosInstance.patch(`/admin/products/${productId}`, data);
}

export const deleteUser = ( userId ) => {
  return axiosInstance.delete(`/admin/users/${userId}`);
}

export const deleteProduct = (productId) =>{
  return axiosInstance.delete(`/admin/products/${productId}`);
}

