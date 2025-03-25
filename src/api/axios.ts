// import axios, { type AxiosInstance } from 'axios';

// const apiClient: AxiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api', // Spring Boot backend URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default apiClient;

import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api', // Spring Boot backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add accessToken from cookies
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken) {
        try {
          const response = await apiClient.post('/auth/refresh', { refreshToken });
          const { accessToken } = response.data.data;
          Cookies.set('accessToken', accessToken, { expires: 1 / 144 }); // 10 minutes
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed; clear cookies and redirect to login
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;