'use client'

import React from 'react'
import '../../styles/globals.css'
import Image from 'next/image'
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const homePage = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="flex flex-col bg-gray-300 justify-center items-center p-4 sm:h-screen md:h-screen xl:h-screen">
            <div className="flex md:w-[900px]">
                <p className="text-2xl text-left p-3 text-gray-800 bg-blue-100 rounded-md shadow-md">
                    Bienvenido <span>{user?.usuarioNombre} {user?.usuarioApellidoPaterno} {user?.usuarioApellidoMaterno}</span>
                </p>

            </div>
            <div className='flex flex-col sm:flex-row md:flex-row xl:flex-row justify-center items-center md:w-[900px]'>
                <div className="flex flex-col justify-center p-3 md:w-[600px] sm:w-50">
                    <h1 className="text-2xl font-bold mb-2">Impulsa tu Negocio al Siguiente Nivel</h1>
                    <p className="text-lg">
                        Conecta tu empresa con nuevas oportunidades. Promociona tus productos,
                        servicios y marca de manera efectiva, llegando a tu audiencia ideal con
                        herramientas personalizadas que maximizan tu visibilidad y crecimiento.
                    </p>

                </div>
                <div className="flex justify-center items-center">
                    <Image
                        src="/images/empleados.jpeg"
                        alt="empleados"
                        className="rounded-full object-cover"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
        </div>


    )
}

export default homePage
