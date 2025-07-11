// src/api/axios.js
import axios from 'axios';

// Read the backend URL from Vite environment variable
const BASE_URL = import.meta.env.VITE_REST_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add access token to request headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle expired token (403) globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            // Optional: clear access token
            localStorage.removeItem('accessToken');

            // Redirect to login
            window.location.href = '/'; // or wherever your login page is
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
