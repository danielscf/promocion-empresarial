import axios from 'axios'

const marcaApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/marca'

}) 
// rolApi.interceptors.request.use(
//     (config) => {
        
//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export const getAllMarcasByEmprendedor = (emprendedorId) => marcaApi.get(`/emprendedor/${emprendedorId}`)

export const registerMarca = async (formData) => {
    
    return marcaApi.post('', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error al registrar la marca:", error);
        throw error;
    });
}

export const findMarcaById = (marcaId) => marcaApi.get(`/${marcaId}`)

export const editMarca = async (formData) => {
    
    return marcaApi.put('', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response =>response.data)
    .catch(error => {
        console.error("Error al registrar la marca:", error);
        throw error;
    });
}

export const eliminarMarca = (marcaId) => marcaApi.delete(`${marcaId}`)