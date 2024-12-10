import axios from 'axios'
import Cookies from "js-cookie";

const rolApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/rol',
    withCredentials: true,

}) 

rolApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllRol = () => rolApi.get('')
  