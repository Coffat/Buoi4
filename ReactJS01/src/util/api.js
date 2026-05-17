import axios from './axios.customize.js';

const createUserApi = (name, email, password) => {
  const URL_API = '/v1/api/register';
  return axios.post(URL_API, { name, email, password });
};

const loginApi = (email, password) => {
  const URL_API = '/v1/api/login';
  return axios.post(URL_API, { email, password });
};

const getUserApi = () => {
  const URL_API = '/v1/api/user';
  return axios.get(URL_API);
};

const updateProfileApi = (name, newPassword) => {
  return axios.put('/v1/api/user/profile', { name, newPassword });
};

const forgotPasswordApi = (email) => {
  return axios.post('/v1/api/forgot-password', { email });
};

const resetPasswordApi = (email, token, newPassword) => {
  return axios.post('/v1/api/reset-password', {
    email,
    token,
    newPassword,
  });
};

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

const getProductDetailApi = (slug) => {
  return axios.get(`/v1/api/products/${slug}`);
};

const getSimilarProductsApi = (slug) => {
  return axios.get(`/v1/api/products/${slug}/similar`);
};

const getCategoriesApi = () => {
  return axios.get('/v1/api/categories');
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getProductsApi,
  getProductDetailApi,
  getSimilarProductsApi,
  getCategoriesApi,
  updateProfileApi,
};
