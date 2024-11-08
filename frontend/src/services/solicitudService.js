import axios from 'axios'

const solicitudApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/solicitud/'

}) 


export const createSolicitud = (solicitud) => solicitudApi.post('emprendedor/usuario',solicitud)
  