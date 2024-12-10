'use client'

import { linkRestablecerContrasena } from '@/api/registroApi';
import React,{ useState } from 'react'
import { useForm } from 'react-hook-form';
import { showErrorMessage, showSuccessMessage } from '../utils/messages';

const EnviarMensajePage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);  
    const [emailSent, setEmailSent] = useState(false);  

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await linkRestablecerContrasena(data.emailUsuario);
            showSuccessMessage(
                'Correo enviado con éxito',
                'Te hemos enviado un correo con instrucciones para restablecer tu contraseña.'
            );
            setEmailSent(true);
            reset();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                showErrorMessage('Error', 'No se encontró un usuario con ese correo.');
            } else {
                showErrorMessage(
                    'Error',
                    'Ocurrió un problema al enviar el correo. Intenta nuevamente más tarde.'
                );
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            {emailSent ? (
                <div className="bg-green-100 border border-green-400 text-green-700 p-6 rounded-lg shadow-md max-w-sm w-full">
                    <h2 className="text-xl font-semibold mb-4">Revisa tu correo electrónico</h2>
                    <p>Te hemos enviado un correo con instrucciones para restablecer tu contraseña. Por favor revisa tu bandeja de entrada o la carpeta de spam.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl rounded-xl p-6 max-w-sm w-full">
                    <h2 className='text-xl my-5'>RESTABLECE TU CONTRASEÑA</h2>
                    <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            placeholder="carlos_fernandez@gmail.com"
                            {...register("emailUsuario", { required: "El email es obligatorio." })}
                        />
                        {errors.emailUsuario && (
                            <p className="text-red-500 text-sm mt-1">{errors.emailUsuario.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="text-white bg-blue-700 my-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                    {loading && <div className="spinner">Cargando...</div>}
                </form>
            )}
        </div>
    )
}

export default EnviarMensajePage;
