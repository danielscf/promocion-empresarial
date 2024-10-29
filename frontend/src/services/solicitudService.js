import axios from 'axios';

const solicitudApi = axios.create({

    baseURL:'http://localhost:8080/solicitud/'

}) 

export const createSolicitud = (solicitud) => solicitudApi.post('emprendedor/usuario',solicitud)
  