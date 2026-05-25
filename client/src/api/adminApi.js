import axiosInstance from "./axiosInstance.js";

export const getAllUser = (search , status , limit) => {
  return axiosInstance.get(`/admin/users?search=${search}&status=${status}&limit=${limit}`);
};

export const getAllProduct = (search, category, limit) => {
  return axiosInstance.get(`/admin/products?search=${search}&category=${category}&limit=${limit}`);
} 

export const getAllOrders = (search, statusFilter, limit) => {
  return axiosInstance.get(`/admin/orders?search=${search}&status=${statusFilter}&limit=${limit}`);
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

