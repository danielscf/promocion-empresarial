'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { alertPersonalizado, showSuccessMessage } from '../utils/messages';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CambiarContrasenaPage = () => {

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

        const nuevaContrasena = data.usuarioContrasena

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/registro/cambiar-contrasena?token=${token}`,
                nuevaContrasena,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                showSuccessMessage('Contraseña cambiada', 'Contraseña cambiada exitosamente')
                router.push('/');
            }
        } catch (error) {
            if (error.response) {
                alertPersonalizado(error.response.data.message || "Error al completar el cambiar la contraseña.");
            } else if (error.request) {
                console.error("No response received:", error.request);
                alertPersonalizado("No se recibió respuesta del servidor.");
            } else {
                console.error("Error in request setup:", error.message);
                alertPersonalizado("Hubo un problema con la solicitud.");
            }
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full"
            >
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                    Restablecer Contraseña
                </h2>

                <div className="mb-5 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        {...register("usuarioContrasena", { required: "La nueva contraseña es obligatoria." })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder="Ingresa tu nueva contraseña"
                    />
                    {errors.usuarioContrasena && (
                        <p className="text-red-500 text-sm mt-1">{errors.usuarioContrasena.message}</p>
                    )}
                </div>

                <div className="mb-5 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Repetir Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        {...register("repetirContrasena", {
                            required: "Repetir la nueva contraseña es obligatorio.",
                            validate: (value) =>
                                value === watch("usuarioContrasena") || "Las contraseñas no coinciden.",
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                        placeholder="Repite tu nueva contraseña"
                    />
                    {errors.repetirContrasena && (
                        <p className="text-red-500 text-sm mt-1">{errors.repetirContrasena.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-3 text-center transition-transform transform hover:scale-105"
                >
                    Guardar
                </button>
            </form>
        </div>

    )
}

export default CambiarContrasenaPage
