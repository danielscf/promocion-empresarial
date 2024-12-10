import axios from "axios";
import Cookies from "js-cookie";

const rucApi = axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_URL + '/ruc',
    withCredentials: true,

})

rucApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const fetchRucInfo = async (ruc) => {
    try {
        const response = await rucApi.get(`/${ruc}`);
        console.log('Datos del RUC:', response.data);
        return response; 
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 500) {
                console.error('Error 500: Error interno del servidor');
                throw new Error('Error interno del servidor. Por favor, inténtelo de nuevo más tarde.');
            } else {
                console.error(`Error ${status}: ${data?.message || 'Ocurrió un error al obtener los datos del RUC.'}`);
                throw new Error(data?.message || 'Ocurrió un error al obtener los datos del RUC.');
            }
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            throw new Error('No se pudo conectar con el servidor. Verifique su conexión a internet.');
        } else {
            console.error('Error:', error.message);
            throw new Error('Ocurrió un error desconocido. Inténtelo de nuevo.');
        }
    }
};
