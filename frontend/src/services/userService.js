import axios from 'axios';

const usuarioApi = axios.create({

    baseURL:'http://localhost:8080/usuario'

}) 

export const getAllUsuarios = () => usuarioApi.get('')
export const createUsuario = (alumno) => usuarioApi.post('',alumno)
  