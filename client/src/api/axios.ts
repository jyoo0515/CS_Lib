import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost/api',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
});

export default apiClient;
