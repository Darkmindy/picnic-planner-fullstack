// src/api/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (userData: { name: string, email: string, password: string }) => {
  const response = await apiClient.post('/signup', userData);
  return response.data;
};

export const signIn = async (userData: { email: string, password: string }) => {
  const response = await apiClient.post('/login', userData);
  return response.data;
};

export const logOut = async (userData: { email: string, password: string }) => {
  const response = await apiClient.post('/logout', userData);
  return response.data;
};
