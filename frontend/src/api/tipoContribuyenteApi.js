import axios from 'axios'

const tipoContribuyenteApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/tipoContribuyente'

}) 

// tipoContribuyenteApi.interceptors.request.use(
//     (config) => {
        
//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const getAllTipoContribuyente = () => tipoContribuyenteApi.get('')
  