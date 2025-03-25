import axios from 'axios';
import apiClient from "./axios";
const API_URL = 'http://localhost:8080/api/modules';
const AUTH_URL = "http://localhost:8080/auth/refresh-token"; // Endpoint for refreshing token

import Cookies from "universal-cookie";

const cookies = new Cookies();

// Function to refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = cookies.get("refreshToken"); // Retrieve refresh token
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(AUTH_URL, { refreshToken });
    const newAccessToken = response.data.accessToken;

    // Store new token in cookies
    cookies.set("accessToken", newAccessToken, { path: "/" });

    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};


export const getModules = async (token: string) => {
  return await apiClient.get("/modules/my-modules", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// Function to create a module with automatic token refresh
export const createModule = async (moduleData: any) => {
  let token = cookies.get("accessToken");

  try {
    return await axios.post(API_URL, moduleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    // Check if token expired (401 Unauthorized)
    if (error.response?.status === 401) {
      try {
        token = await refreshAccessToken(); // Refresh token
        return await axios.post(API_URL, moduleData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};

// New function to update a module
export const updateModule = async (moduleId: number, moduleData: any) => {
  let token = cookies.get("accessToken");
  try {
    return await axios.put(`${API_URL}/${moduleId}`, moduleData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        token = await refreshAccessToken();
        return await axios.put(`${API_URL}/${moduleId}`, moduleData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    } else {
      throw error;
    }
  }
};

// Function to get a single module by ID
export const getModuleById = async (moduleId: number) => {
  const token = cookies.get("accessToken");
  return await axios.get(`${API_URL}/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const togglePublishModule = async (moduleId: number, publish: boolean) => {
  return axios.patch(`${API_URL}/${moduleId}/publish`, null, { params: { publish } });
};

export const getMyModules = async () => {
  return axios.get(`${API_URL}/my-modules`);
};

export const browseModules = async (courseName?: string, title?: string, contentType?: string) => {
  return axios.get(`${API_URL}`, { params: { courseName, title, contentType } });
};

export const markModuleCompleted = async (moduleId: number) => {
  return axios.post(`${API_URL}/${moduleId}/complete`);
};

export const getProgress = async () => {
  return axios.get(`${API_URL}/progress`);
};

export const getCompletionReport = async () => {
  return axios.get(`${API_URL}/report`);
};
