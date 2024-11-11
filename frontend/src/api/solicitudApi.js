import axios from 'axios'

const solicitudApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/solicitud'

}) 

export const createSolicitud = async (solicitud, selectedFile, emprendedorRuc) => {
    const formData = new FormData();
    
    // Agrega los datos del 'solicitud' al FormData
    formData.append('solicitud', JSON.stringify(solicitud));  // Convierte la solicitud a JSON antes de enviarla

    // Agrega la foto y el RUC a los parámetros
    if (selectedFile) {
        formData.append('foto', selectedFile);
    }
    formData.append('emprendedorRuc', emprendedorRuc);

    // Configura los headers, por ejemplo para la autenticación
    const headers = {
        'Content-Type': 'multipart/form-data',  // Aunque Axios maneja esto, es opcional agregarlo
    
    };

    // Realiza la solicitud POST usando el FormData
    try {
        const response = await solicitudApi.post('/emprendedor/usuario', formData, { headers });
        return response;  // Devuelve la respuesta del servidor
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        throw error;  // Lanza el error para manejarlo más arriba si es necesario
    }
};




export const getAllSolicitud = () => solicitudApi.get('')

export const getSolicitudById = (solicitudId) => solicitudApi.get(`/${solicitudId}`)

export const aprobarSolicitud = (solicitudId) => solicitudApi.patch(`/${solicitudId}/aprobar`)

export const rechazarSolicitud = (solicitudId) => solicitudApi.patch(`/${solicitudId}/rechazar`)

export const eliminarSolicitud = (solicitudId) => solicitudApi.delete(`/${solicitudId}`)
  