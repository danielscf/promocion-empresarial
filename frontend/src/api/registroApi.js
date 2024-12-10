import axios from 'axios'


const registroApi = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_URL+'/registro',
    withCredentials: true,

}) 


export const linkTerminarRegistro = (correo) => 
    registroApi.post('/enviar-link', JSON.stringify(correo), {
        headers: {
            'Content-Type': 'application/json'
        }
    });

export const linkRestablecerContrasena = (correo) => {
    registroApi.post('enviar-link-cambio-contrasena',JSON.stringify(correo),{
        headers:{
               'Content-Type': 'application/json'
        }
    })
}