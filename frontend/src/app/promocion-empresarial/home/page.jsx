'use client'

import React from 'react'
import '../../styles/globals.css'
import Image from 'next/image'
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const HomePage = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 justify-center items-center p-6 min-h-screen">
            <div className="flex w-full max-w-[900px] mb-8">
                <p className="text-3xl font-semibold text-left p-4 text-white bg-blue-500 rounded-lg shadow-lg w-full">
                    Bienvenido <span className="font-bold">{user?.usuarioNombre} {user?.usuarioApellidoPaterno} {user?.usuarioApellidoMaterno}</span>
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center h-[350px] max-w-[900px] gap-8">
                <div className="flex flex-col bg-white shadow-xl border border-gray-300 rounded-xl h-full p-8 w-full md:w-1/2">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                        Impulsa tu Negocio al Siguiente Nivel
                    </h1>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Conecta tu empresa con nuevas oportunidades. Promociona tus productos, servicios y marca de manera efectiva,
                        llegando a tu audiencia ideal con herramientas personalizadas que maximizan tu visibilidad y crecimiento.
                    </p>
                </div>

                <div className="flex justify-center items-center w-full h-full md:w-1/2">
                    <Image
                        src="/images/empleados.jpeg"
                        alt="empleados"
                        className="rounded-xl object-cover w-full h-full shadow-lg"
                        width={400}
                        height={300}
                    />
                </div>
            </div>
        </div>

    )
}

export default HomePage
