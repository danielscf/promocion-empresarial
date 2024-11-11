import React from 'react'
import NavbarUser from '@/src/components/navbarUser'
import Link from 'next/link'

export default function MisDatoslayout({ children }) {
    return (
        <div className='flex flex-row justify-between'>
            <NavbarUser>
                <div className='flex flex-col'>
                    <Link className='my-3 p-2 text-start rounded-lg  hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/mis-datos/datos-personales">
                        Datos Personales
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/mis-datos/solicitudes">
                        Solicitudes
                    </Link>
                     <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/mis-datos/cambiar-contrasena">
                        Cambiar Contraseña
                    </Link>
                </div>
            </NavbarUser>
            {children}
        </div>
    )
}
