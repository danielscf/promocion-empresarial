import axios from 'axios'


const imagenApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/imagen',

}) 



export const registerImagen = async (formData) => {
    
    return imagenApi.post('', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error al registrar la imagen:", error);
        throw error;
    });
}

export const deleteImagen = (imagenId) => imagenApi.delete(`/${imagenId}`)

export const editarImagen = async (formData) => {
    
    return imagenApi.put('', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error al editar la imagen:", error);
        throw error;
    });
}