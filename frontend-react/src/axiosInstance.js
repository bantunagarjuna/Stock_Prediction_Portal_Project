import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8000/api/v1"; // Fallback to default if env variable is missing

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh');
            if (!refreshToken) {
                console.error("No refresh token found. Redirecting to login.");
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // Attempt to refresh the token
                const response = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
                localStorage.setItem('access', response.data.access);
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
                console.log("Token refreshed successfully");
                return axiosInstance(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;