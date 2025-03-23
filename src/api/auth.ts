// import axios from 'axios';

// export const login = async (email: string, password: string) => {
//   const response = await axios.post('/auth/login', { email, password });
//   return response.data;
// };

// export const signup = async (name: string, email: string, password: string) => {
//   const response = await axios.post('/auth/signup', { name, email, password });
//   return response.data;
// };

// export const logout = () => {
//   localStorage.removeItem('token');
//   delete axios.defaults.headers.common['Authorization'];
// };
import apiClient from './axios';

interface LoginResponse {
  data: {
    accessToken: string;
    id: number;
    email: string;
  };
  error: string | null;
}

interface SignupResponse {
  data: {
    id: number;
    email: string;
    name: string;
  };
  error: string | null;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (name: string, email: string, password: string): Promise<SignupResponse> => {
  const response = await apiClient.post('/auth/signup', { name, email, password });
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};