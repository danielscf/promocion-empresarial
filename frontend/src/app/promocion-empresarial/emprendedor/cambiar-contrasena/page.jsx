import React from 'react'
import CambiarContrasena from '@/components/cambiarContrasena'

const CambiarContrasenaPage = () => {
    return (
        <div className='h-screen'>
            <h1 className='my-6 text-center text-2xl text-black font-bold'>Cambiar Contraseña</h1>
            <div className='bg-white w-11/12 md:w-9/12 lg:w-5/12 xl:w-5/12 m-auto p-6 rounded-lg shadow-lg border border-gray-300'>
                <CambiarContrasena />
            </div>
        </div>
    )
}

export default CambiarContrasenaPage
