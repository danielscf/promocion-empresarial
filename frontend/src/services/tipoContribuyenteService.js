import axios from 'axios'

const tipoContribuyenteApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoContribuyente'

}) 

tipoContribuyenteApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllTipoContribuyente = () => tipoContribuyenteApi.get('')
  