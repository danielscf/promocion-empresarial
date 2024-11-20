import axios from "axios";

const emprendedorApi = axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_URL + '/emprendedor'

})

// emprendedorApi.interceptors.request.use(
//     (config) => {

//         config.withCredentials = true;
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


export const getEmprendorByUsername = (username) => emprendedorApi.get(`/usuario/${username}`)

export const findEmprendedorByDni = (dni) => emprendedorApi.get(`/dni/${dni}`)

export const findEmprendedorById = (emprendedorId) => emprendedorApi.get(`/${emprendedorId}`)

export const getAllEmprendedores = () => emprendedorApi.get('')

export const findEmprendedorByRuc = (ruc) => emprendedorApi.get(`/ruc/${ruc}`)

export const editEmprendedor = async (formData) => {
    
    return emprendedorApi.put(`/editar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error al editar el emprendedor:", error);
        throw error;
    });
}