import axios from './axios.customize.js';

const registerApi = (name, email, password) =>
  axios.post('/v1/api/auth/register', { name, email, password });

const loginApi = (email, password) =>
  axios.post('/v1/api/auth/login', { email, password });

const getMeApi = () => axios.get('/v1/api/users/me');

const getUsersApi = () => axios.get('/v1/api/users');

const updateProfileApi = (name, newPassword) =>
  axios.patch('/v1/api/users/me', { name, newPassword });

const forgotPasswordApi = (email) =>
  axios.post('/v1/api/auth/forgot-password', { email });

const resetPasswordApi = (email, token, newPassword) =>
  axios.post('/v1/api/auth/reset-password', { email, token, newPassword });

const getProductsApi = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  const qs = query.toString();
  return axios.get(`/v1/api/products${qs ? `?${qs}` : ''}`);
};

const getProductDetailApi = (slug) => axios.get(`/v1/api/products/${slug}`);

const getSimilarProductsApi = (slug) =>
  axios.get(`/v1/api/products/${slug}/similar`);

const getCategoriesApi = () => axios.get('/v1/api/categories');

const createUserApi = registerApi;
const getUserApi = getUsersApi;

export {
  registerApi,
  loginApi,
  getMeApi,
  getUsersApi,
  updateProfileApi,
  forgotPasswordApi,
  resetPasswordApi,
  getProductsApi,
  getProductDetailApi,
  getSimilarProductsApi,
  getCategoriesApi,
  createUserApi,
  getUserApi,
};
