import axiosInstance from './axios';

export const signUp = (data) => axiosInstance.post('/auth/signup', data);
export const signIn = (data) => axiosInstance.post('/auth/signin', data);
export const refreshToken = (token) => axiosInstance.post('/auth/refresh', { refreshToken: token });