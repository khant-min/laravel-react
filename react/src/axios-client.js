import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        const { response } = err;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        }
        throw err;
    }
);

export default axiosClient;
