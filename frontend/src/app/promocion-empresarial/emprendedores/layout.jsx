'use client'

import React, { useState } from 'react'
import NavbarUser from '@/components/navbarUser'
import Link from 'next/link'

export default function Emprendedoreslayout({ children }) {

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

        <div className='flex flex-row justify-start'>
            <NavbarUser setishide={setishide} ishide={ishide} isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
                <div className='flex flex-col mx-auto'>
                    <Link
                        href="/promocion-empresarial/emprendedores/consultar-emprendedor"
                        onClick={handleLinkClick}
                        className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300'>
                        Consultar Emprendedor
                    </Link>
                    <Link
                        href="/promocion-empresarial/emprendedores/solicitudes"
                        onClick={handleLinkClick}
                        className='my-3 p-2 text-start rounded-lg hover:bg-blue-600 transition duration-300'>
                        Solicitudes
                    </Link>
                </div>
            </NavbarUser>
            <div className={`p-4 max-w-full w-full bg-gray-100 ${ishide ? 'hidden' : ''} overflow-x-hidden`}>
                {children}
            </div>

        </div >
    )
}
