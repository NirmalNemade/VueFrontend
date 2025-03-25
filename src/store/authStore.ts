
// import { defineStore } from 'pinia';
// import apiClient from '../api/axios';

// // Define the User type
// interface User {
//   id: number;
//   email: string;
// }

// // Define the state interface
// interface AuthState {
//   user: User | null;
//   token: string | null;
// }

// export const useAuthStore = defineStore('auth', {
//   state: (): AuthState => ({
//     user: null,
//     token: localStorage.getItem('token') || null,
//   }),
//   getters: {
//     isAuthenticated: (state: AuthState): boolean => !!state.token,
//   },
//   actions: {
//     async login(email: string, password: string): Promise<void> {
//       const response = await apiClient.post('/auth/login', { email, password });
//       this.token = response.data.data.accessToken; // Adjust based on backend response
//       this.user = { id: response.data.data.id, email: response.data.data.email };
//       if (this.token) {
//         localStorage.setItem('token', this.token);
//       }
//     },
//     logout(): void {
//       this.token = null;
//       this.user = null;
//       localStorage.removeItem('token');
//     },
//   },
// });


import { defineStore } from 'pinia';
import apiClient from '../api/axios';
import Cookies from 'js-cookie';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface LoginResponse {
  data: {
    id: number;
    accessToken: string;
    refreshToken: string;
  };
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
  }),
  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.accessToken,
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
      const { id, accessToken, refreshToken } = response.data.data;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.user = { id, email };
      Cookies.set('accessToken', accessToken, { expires: 1 / 144 }); // 10 minutes
      Cookies.set('refreshToken', refreshToken, { expires: 365 }); // 1 year, adjust as needed
    },
    logout(): void {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
});