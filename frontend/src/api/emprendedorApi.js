import axios from "axios";

const emprendedorApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/emprendedor'

})

emprendedorApi.interceptors.request.use(
    (config) => {
        
        config.withCredentials = true;
        return config;
    },
    (error) => Promise.reject(error)
);


export const getEmprendorByUsername = (username) => emprendedorApi.get(`/usuario/${username}`)

export const editEmprendedor = (emprendedor) => emprendedorApi.put(``,emprendedor)

// export const uploadEmprendedorImage = (file,emprendedorRuc) => {
//     const formData = new FormData();
//     formData.append('foto', file);
//     formData.append('emprendedorRuc', emprendedorRuc); 

//     return emprendedorApi.post('/uploadFoto', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',  
//         },
//     });
// };