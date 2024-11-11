import axios from 'axios'

const rolApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/rol'

}) 
// rolApi.interceptors.request.use(
//     (config) => {
        
//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const getAllRol = () => rolApi.get('')
  