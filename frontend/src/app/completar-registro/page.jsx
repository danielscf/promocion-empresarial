'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { showSuccessMessage } from '../utils/messages';

const CompletarRegistro = () => {
    const router = useRouter(); 
    const [token, setToken] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenParam = queryParams.get("token");
        setToken(tokenParam);
    }, []);

    if (!token) {
        return <div>Cargando...</div>; 
    }

    const onSubmit = async (data) => {
        const datos = {
            "usuarioUsuario": data.usuarioUsuario,
            "usuarioContrasena": data.usuarioContrasena
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/registro/completar?token=${token}`, 
                datos, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status === 200) {
                showSuccessMessage('Registro completado','Registro completado exitosamente')
                router.push('/'); 
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "Error al completar el registro.");
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("No se recibió respuesta del servidor.");
            } else {
                console.error("Error in request setup:", error.message);
                alert("Hubo un problema con la solicitud.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm flex flex-col items-center justify-center h-screen mx-auto">
            <div className="mb-5 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre de Usuario
                </label>
                <input
                    type="text"
                    {...register("usuarioUsuario", { required: "El nombre de usuario es obligatorio." })}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.usuarioUsuario && (
                    <p className="text-red-500 text-sm mt-1">{errors.usuarioUsuario.message}</p>
                )}
            </div>

            <div className="mb-5 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nueva Contraseña
                </label>
                <input
                    type="password"
                    {...register("usuarioContrasena", { required: "La nueva contraseña es obligatoria." })}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.usuarioContrasena && (
                    <p className="text-red-500 text-sm mt-1">{errors.usuarioContrasena.message}</p>
                )}
            </div>

            <div className="mb-5 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Repetir Nueva Contraseña
                </label>
                <input
                    type="password"
                    {...register("repetirContrasena", {
                        required: "Repetir la nueva contraseña es obligatorio.",
                        validate: (value) =>
                            value === watch("usuarioContrasena") || "Las contraseñas no coinciden.",
                    })}
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
                {errors.repetirContrasena && (
                    <p className="text-red-500 text-sm mt-1">{errors.repetirContrasena.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Guardar
            </button>
        </form>
    );
};

export default CompletarRegistro;
