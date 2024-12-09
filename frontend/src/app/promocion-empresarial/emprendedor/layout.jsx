'use client'

import NavbarUser from '@/components/navbarUser'
import Link from 'next/link'
import { useState } from 'react'


export default function EmprendedorLayout({ children }) {

    const [ ishide, setishide ] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false);

    const handleLinkClick = () => {
        const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
        setishide(false);
        if (isSmallScreen) {
            setIsExpanded(!isExpanded);
        }
    };

    return (

        <div className="flex flex-row justify-between">
            <NavbarUser setishide={setishide} ishide={ishide} isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
                <div className="flex flex-col mx-auto">
                    <Link className='my-3 p-2 text-start rounded-lg  hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/datos-emprendedor"
                        onClick={handleLinkClick}>
                        Datos Emprendedor

                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/productos"
                      onClick={handleLinkClick}>
                        Productos
                       
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/marcas"
                      onClick={handleLinkClick}>
                        Marcas
                    
                    </Link>
                    <Link className='my-3 p-2 text-start rounded-lg  hover:bg-blue-600 transition duration-300' href="/promocion-empresarial/emprendedor/cambiar-contrasena"
                      onClick={handleLinkClick}>
                        Cambiar Contraseña
                    
                    </Link>
                </div>
            </NavbarUser >

            <div className={`p-4 max-w-full w-full bg-gray-100 ${ishide ? 'hidden' : ''} overflow-x-hidden`}>
                {children}
            </div>

        </div >

    )


}
