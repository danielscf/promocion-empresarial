import axios from 'axios'

const usuarioApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/usuario'

}) 

// usuarioApi.interceptors.request.use(
//     (config) => {
        
//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const getAllUsuarios = () => usuarioApi.get('')
export const createUsuario = (usuario) => usuarioApi.post('/registro',usuario)
export const editUsuario = (usuario) => usuarioApi.put('',usuario)
export const deleteUsuario = (id) => usuarioApi.delete(`/${id}`)
export const habilitarUsuario = (id) => usuarioApi.patch(`/${id}/habilitar`)
  