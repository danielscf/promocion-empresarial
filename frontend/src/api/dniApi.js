import axios from "axios";


const dniApi = axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_URL + '/dni',
  
})


export const fetchDniInfo = async (dni) => {
    try {
        const response = await dniApi.get(`/${dni}`);
        console.log('Datos del DNI:', response.data);
        return response; 
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 500) {
                console.error('Error 500: Error interno del servidor');
                throw new Error('Error interno del servidor. Por favor, inténtelo de nuevo más tarde.');
            } else {
                console.error(`Error ${status}: ${data?.message || 'Ocurrió un error al obtener los datos del DNI.'}`);
                throw new Error(data?.message || 'Ocurrió un error al obtener los datos del DNI.');
            }
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            throw new Error('No se pudo conectar con el servidor. Verifique su conexión a internet.');
        } else {
            console.error('Error:', error.message);
            throw new Error('Ocurrió un error desconocido. Inténtelo de nuevo.');
        }
    }
};
