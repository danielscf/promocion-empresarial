import axios from 'axios'
import Cookies from "js-cookie";

const eventoApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/evento',
    withCredentials: true,

}) 

eventoApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllEvento = () => eventoApi.get('')

export const getEventoById = (eventoId) => eventoApi.get(`/${eventoId}`)

export const createEvento = async (formData) => {
    try {
        
        const response = await eventoApi.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error al registrar el evento:', error);
        throw error;
    }
};

export const editarEvento = async (formData,eventoId) => {
    try {
        
        const response = await eventoApi.put(`/${eventoId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error al registrar el evento:', error);
        throw error;
    }
};

