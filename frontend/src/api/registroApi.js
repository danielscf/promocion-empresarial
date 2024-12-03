import axios from 'axios'

const registroApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/registro'

}) 

export const registroCompleto = (correo) => 
    registroApi.post('/enviar-link', JSON.stringify(correo), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
