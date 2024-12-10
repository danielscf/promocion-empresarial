import axios from 'axios'
import Cookies from "js-cookie";

const rubroApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/rubro',
    withCredentials: true,

}) 

rubroApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllRubro = () => rubroApi.get('')
  