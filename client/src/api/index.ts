import axios from 'axios';

const url = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: url,
    timeout: 10_000,
});

// then you can inject token to header every request
apiClient.interceptors.request.use(
    (config) => {
        // TODO: if you want to add auth token
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // TODO: Add here global errors handler here.
        console.error(error);
        return Promise.reject(error);
    }
);

export default apiClient;
