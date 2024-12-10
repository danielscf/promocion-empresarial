import axios from 'axios'
import Cookies from "js-cookie";

const tipoProductoApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoProducto',
    withCredentials: true,

}) 

tipoProductoApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllTipoProducto = () => tipoProductoApi.get('')