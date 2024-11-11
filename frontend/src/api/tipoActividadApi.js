import axios from 'axios'

const tipoActividadApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoActividad'

}) 

// tipoActividadApi.interceptors.request.use(
//     (config) => {
        
//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const getAllTipoActividad = () => tipoActividadApi.get('')
  