'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { cambiarContrasena } from '@/api/userApi';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { showSuccessMessage } from '@/app/utils/messages';
import { showErrorMessage } from '@/app/utils/messages';

const CambiarContrasena = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext)

    const onSubmit = async (data) => {
       
        if (!user?.usuarioUsuario) {
            console.error("El nombre de usuario no se encuentra");
            return;
        }
    
        const datos_user = {
            "contrasenaActual": data.contrasenaActual,
            "nuevaContrasena": data.nuevaContrasena
        };
    
        if (!datos_user.contrasenaActual || !datos_user.nuevaContrasena) {
            showErrorMessage("Error", "Todos los campos son obligatorios.");
            return;
        }
    
        try {
            const response = await cambiarContrasena(user.usuarioUsuario,datos_user)
    
            if (response.status === 200) {
                showSuccessMessage('Edición con éxito', 'El cambio de contraseña se ha realizado con éxito');
                reset(); 
            } else {
                showErrorMessage('Error en la edición', 'Hubo un problema al realizar el cambio de contraseña. Verifica los datos e intenta nuevamente.');
            }
        } catch (error) {
            console.error(error);
            showErrorMessage('Error en la edición', 'Hubo un problema al realizar el cambio de contraseña. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto"
        >
            <div className="mb-5">
                <label
                    htmlFor="contrasenaActual"
                    className="block mb-2 text-sm font-medium text-black "
                >
                    Contraseña Actual
                </label>
                <input
                    type="password"
                    {...register('contrasenaActual', { required: 'La contraseña actual es obligatoria.' })}
                    className={`bg-gray-50 border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.contrasenaActual ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.contrasenaActual && (
                    <p className="text-red-500 text-sm mt-1">{errors.contrasenaActual.message}</p>
                )}
            </div>
            <div className="mb-5">
                <label
                    htmlFor="nuevaContrasena"
                    className="block mb-2 text-sm font-medium text-black"
                >
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    {...register('nuevaContrasena', { required: 'La nueva contraseña es obligatoria.' })}
                    className={`bg-gray-50 border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.nuevaContrasena ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.nuevaContrasena && (
                    <p className="text-red-500 text-sm mt-1">{errors.nuevaContrasena.message}</p>
                )}
            </div>
            <div className="mb-5">
                <label
                    htmlFor="repetirContrasena"
                    className="block mb-2 text-sm font-medium text-black"
                >
                    Repetir Nueva Contraseña
                </label>
                <input
                    type="password"
                    {...register('repetirContrasena', {
                        required: 'Repetir la nueva contraseña es obligatorio.',
                        validate: (value, data) =>
                            value === data?.nuevaContrasena || 'Las contraseñas no coinciden.',
                    })}
                    className={`bg-gray-50 border text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.repetirContrasena ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.repetirContrasena && (
                    <p className="text-red-500 text-sm mt-1">{errors.repetirContrasena.message}</p>
                )}
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Guardar
            </button>
        </form>
    )
}

export default CambiarContrasena
