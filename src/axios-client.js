import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    
});

axiosClient.interceptors.request.use(config => {
    const token = localStorage.getItem('ACCESS-TOKEN');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})


axiosClient.interceptors.response.use(response => { return response }, error => 
{
    const { response } = error;
    if (response && response.status === 401) {
        localStorage.removeItem('ACCESS-TOKEN');
        window.location.href = '/login';
    }

    throw error;
}
);


export default axiosClient;
