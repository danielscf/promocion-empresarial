import React from 'react'
import '../../styles/globals.css'

const homePage = () => {
    return (
        <div className="flex flex-col md:flex-row bg-gray-300 justify-center items-center p-4 h-screen">
            <div className="flex flex-col justify-center p-3 md:w-[700px] sm:w-50">
                <h1 className="text-2xl font-bold mb-2">Impulsa tu Negocio al Siguiente Nivel</h1>
                <p className="text-lg">
                    Conecta tu empresa con nuevas oportunidades. Promociona tus productos,
                    servicios y marca de manera efectiva, llegando a tu audiencia ideal con
                    herramientas personalizadas que maximizan tu visibilidad y crecimiento.
                </p>

            </div>
            <div className="flex justify-center items-center w-[350px] h-[300px]">
                <img
                    src="/images/empleados.jpeg"
                    alt="empleados"
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
        </div>


    )
}

export default homePage
