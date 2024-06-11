import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/apiClient', // URL del tuo backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
