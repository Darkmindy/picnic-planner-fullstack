// src/api/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://example.com/api', // Sostituisci con il tuo URL base
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
