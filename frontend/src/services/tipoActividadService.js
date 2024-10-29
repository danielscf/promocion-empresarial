import axios from 'axios';

const tipoActividadApi = axios.create({

    baseURL:'http://localhost:8080/tipoActividad'

}) 

export const getAllTipoActividad = () => tipoActividadApi.get('')
  