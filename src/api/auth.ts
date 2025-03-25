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
    phoneNumber: string;
    role: string; // 👈 Ensure role is a string
  };
  error: string | null;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const signup = async (
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: string // Ensure role is a string
): Promise<SignupResponse> => {
  const payload = {
    name,
    email,
    phoneNumber,
    password,
    role, // 👈 Send role as a plain string, not an object
  };

  console.log("Signup Payload:", JSON.stringify(payload, null, 2)); // Debugging log

  const response = await apiClient.post('/auth/signup', payload);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};
