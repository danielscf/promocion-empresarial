import axios from 'axios'

const rubroApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/rubro'

}) 

// rubroApi.interceptors.request.use(
//     (config) => {
     
//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const getAllRubro = () => rubroApi.get('')
  