import axios from 'axios'
import Cookies from "js-cookie";

const usuarioApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/usuario',
    withCredentials: true,

}) 

usuarioApi.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export const getAllUsuarios = () => usuarioApi.get('')
export const getUsuarioById = (usuarioId) => usuarioApi.get(`/${usuarioId}`)
export const createUsuario = (usuario) => usuarioApi.post('/registro',usuario)
export const cambiarContrasena = (usuarioUsuario, datosUsuario) =>  usuarioApi.patch(`/${usuarioUsuario}/cambiarContrasena`, datosUsuario)
export const editUsuario = (usuario) => usuarioApi.put('',usuario)
export const deleteUsuario = (id) => usuarioApi.delete(`/${id}`)
export const findUsuarioById = (id) => usuarioApi.get(`/${id}`)
export const habilitarUsuario = (id) => usuarioApi.patch(`/${id}/habilitar`)

  