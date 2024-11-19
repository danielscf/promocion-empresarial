import React from 'react'

const EmprendedorCard = ({emprendedor}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-center w-40">
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/emprendedor/${emprendedor.emprendedorId}/foto`}
                alt={'Imagen del emprendedor'}
                className="rounded mx-auto mb-4 h-40"
            />
            <div className="text-sm">
                <p><strong>{emprendedor.usuario.usuarioNombre} {emprendedor.usuario.usuarioApellidoPaterno} {emprendedor.usuario.usuarioApellidoMaterno}</strong></p>
                <p><strong>RUC:</strong>{emprendedor.emprendedorRuc}</p>
            </div>
        </div>
    )
}

export default EmprendedorCard
