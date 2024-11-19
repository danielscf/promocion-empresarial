import axios from 'axios'

const solicitudApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/solicitud'

}) 

export const createSolicitud = async (solicitud, selectedFile, emprendedorRuc) => {
    const formData = new FormData();
    
    formData.append('solicitud', JSON.stringify(solicitud)); 

    if (selectedFile) {
        formData.append('foto', selectedFile);
    }

    formData.append('emprendedorRuc', emprendedorRuc);

    const headers = {
        'Content-Type': 'multipart/form-data',  
    
    };

    try {
        const response = await solicitudApi.post('/emprendedor/usuario', formData, { headers });
        return response;  
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        throw error;  
    }
};




export const getAllSolicitud = () => solicitudApi.get('')

export const getSolicitudById = (solicitudId) => solicitudApi.get(`/${solicitudId}`)

export const aprobarSolicitud = (solicitudId) => solicitudApi.patch(`/${solicitudId}/aprobar`)

export const rechazarSolicitud = (solicitudId) => solicitudApi.patch(`/${solicitudId}/rechazar`)

export const eliminarSolicitud = (solicitudId) => solicitudApi.delete(`/${solicitudId}`)
  