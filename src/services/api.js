import axiosInstance from './axios';


export const createCustomer = (data) => axiosInstance.post('/user/customer/create', data);
export const updateCustomer = (id, data) => axiosInstance.put(`/user/customer/update/${id}`, data);
export const getAllCustomers = (page, pageSize) => axiosInstance.get(`/user/getAllCustomer`, { params: { page, pageSize } });
export const getCustomerById = (id) => axiosInstance.get(`/user/getCustomerById/${id}`);
export const deleteCustomerById = (id) => axiosInstance.delete(`/user/deleteCustomerById/${id}`);


// import axiosInstance from './axios';

// export const createCustomer = (data) => axiosInstance.post('/user/customer/create', data);
// export const updateCustomer = (id, data) => axiosInstance.put(`/user/customer/update/${id}`, data);
// export const getAllCustomers = (page, pageSize) => axiosInstance.get(`/user/getAllCustomer`, { params: { page, pageSize } });
// export const getCustomerById = (id) => axiosInstance.get(`/user/getCustomerById/${id}`);
// export const deleteCustomerById = (id) => axiosInstance.delete(`/user/deleteCustomerById/${id}`);