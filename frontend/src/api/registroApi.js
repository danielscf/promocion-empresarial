import axios from 'axios'
import Cookies from "js-cookie";

const registroApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/registro',
    withCredentials: true,

}) 

registroApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const linkTerminarRegistro = (correo) => 
    registroApi.post('/enviar-link', JSON.stringify(correo), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

export const linkRestablecerContrasena = (correo) => {
    registroApi.post('enviar-link-cambio-contrasena',JSON.stringify(correo),{
        headers:{
               'Content-Type': 'application/json'
        }
    })
}