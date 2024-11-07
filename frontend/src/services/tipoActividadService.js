import axios from 'axios'

const tipoActividadApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoActividad'

}) 

tipoActividadApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllTipoActividad = () => tipoActividadApi.get('')
  