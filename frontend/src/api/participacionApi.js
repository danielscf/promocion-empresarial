import axios from 'axios'

const participacionApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/participacion'

}) 
participacionApi.interceptors.request.use(
    (config) => {
        
        config.withCredentials = true;
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllParticipantes = (eventoId) => participacionApi.get(`/evento/${eventoId}`)

export const actualizarAsistencia = (participanteEventoId,estado) => participacionApi.patch(`/${participanteEventoId}/actualizar-asistencia/${estado}`)

export const createParticipacion = (datos) => participacionApi.post('',datos)

export const descargarDiplomas = async (eventoId) => {
    const response = await participacionApi.get(`/evento/${eventoId}/descargar-diplomas`, {
        responseType: 'blob',
    });
    return response;
};

export const deleteParticipante = (participanteEventoId) => participacionApi.delete(`/${participanteEventoId}`)

