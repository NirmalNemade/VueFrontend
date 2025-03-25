
//   import apiClient from './axios';

// export interface Employee {
//   id?: number;
//   fullName: string;
//   department: string;
//   contactNumber: string;
//   email: string;
//   dateOfJoining: string; // ISO format: "YYYY-MM-DD"
// }

// export interface EmployeeResponse {
//   message: string;
//   data: Employee;
// }

// export const getEmployees = async (): Promise<Employee[]> => {
//   const response = await apiClient.get('/employees'); // Already prefixed with /api in axios.ts
//   return response.data; // Ensure backend returns Employee[] directly
// };

// export const getEmployeeById = async (id: number): Promise<Employee> => {
//   const response = await apiClient.get(`/employees/${id}`);
//   return response.data;
// };

// export const addEmployee = async (employee: Employee): Promise<EmployeeResponse> => {
//   const response = await apiClient.post('/employees', employee);
//   return response.data;
// };

// export const updateEmployee = async (id: number, employee: Employee): Promise<EmployeeResponse> => {
//   const response = await apiClient.put(`/employees/${id}`, employee);
//   return response.data;
// };

// export const deleteEmployee = async (id: number): Promise<void> => {
//   await apiClient.delete(`/employees/${id}`);
// };

import apiClient from './axios';

export interface Employee {
  id?: number;
  fullName: string;
  department: string;
  contactNumber: string;
  email: string;
  dateOfJoining: string;
}

export interface EmployeeResponse {
  message: string;
  data: Employee;
}

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get('/employees');
  console.log('getEmployees response:', response.data); // Debug log
  return response.data; // Expecting Employee[]
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await apiClient.get(`/employees/${id}`);
  return response.data;
};

export const addEmployee = async (employee: Employee): Promise<EmployeeResponse> => {
  const response = await apiClient.post('/employees', employee);
  return response.data;
};

export const updateEmployee = async (id: number, employee: Employee): Promise<EmployeeResponse> => {
  const response = await apiClient.put(`/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient.delete(`/employees/${id}`);
};