import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const body = response?.data;
    if (body && typeof body === 'object' && Object.prototype.hasOwnProperty.call(body, 'success')) {
      if (body.success === true) {
        if (body.meta !== null && body.meta !== undefined) {
          return { data: body.data, meta: body.meta };
        }
        return body.data;
      }
    }
    return body;
  },
  (error) => {
    const body = error?.response?.data;
    if (body?.success === false && body.error) {
      const apiError = new Error(body.error.message || 'Yêu cầu thất bại');
      apiError.code = body.error.code;
      apiError.details = body.error.details;
      apiError.status = error.response?.status;
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  }
);

export default instance;
