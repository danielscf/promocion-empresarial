import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteSolicitud } from '../store/solicitudSlice';
import { showConfirmation } from '../app/utils/confirmationDialog';

const Solicitud = ({ solicitudes }) => {

    const dispatch = useDispatch()

    const handleDelete = async (solicitudId) => {

        const confirmed = await showConfirmation('¿Desea eliminar esta solicitud?')
        if (confirmed) {
            dispatch(deleteSolicitud(solicitudId))
        }
    }


    return (

        <div className='w-full flex flex-wrap justify-center gap-4'>
            {solicitudes.map((solicitud) => (
                <div
                    key={solicitud.solicitudId}
                    className={`flex flex-row items-center justify-center w-full p-6 ${solicitud.solicitudEstado === 2 ? 'bg-lime-300' : solicitud.solicitudEstado === 1 ? 'bg-red-400' : 'bg-white'} 
                     border-gray-200 rounded-lg shadow hover:bg-gray-100`}
                >
                    <Link href={`/promocion-empresarial/mis-datos/solicitudes/${solicitud.solicitudId}`} className="block w-full">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {solicitud.tipoSolicitud.tipoSolicitudNombre}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {solicitud.solicitudDescripcion}
                        </p>
                    </Link>
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleDelete(solicitud.solicitudId)}
                        className="text-red-600 my-auto cursor-pointer h-6 w-6 ml-4 self-start"
                    />
                </div>
            ))}
        </div>

    )
}

export default Solicitud
