import axios from 'axios'

const tipoProductoApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoProducto'

}) 

tipoProductoApi.interceptors.request.use(
    (config) => {
        
        config.withCredentials = true;
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllTipoProducto = () => tipoProductoApi.get('')