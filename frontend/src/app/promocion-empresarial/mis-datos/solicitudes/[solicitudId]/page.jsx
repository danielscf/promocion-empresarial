'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveSolicitud, declineSolicitud, getSolicitudById } from '@/store/solicitudSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { habilitarUsuario } from '@/store/userSlice';
import { showSuccessMessage } from '@/app/utils/messages';
import { deleteUsuario } from '@/store/userSlice';
import { registroCompleto } from '@/api/registroApi';

const Page = ({ params }) => {

    const dispatch = useDispatch()
    const router = useRouter()
    const solicitud = useSelector((state) => state.solicitudes.nuevaSolicitud);
    const status = useSelector((state) => state.solicitudes.status);

    useEffect(() => {

        dispatch(getSolicitudById(params.solicitudId));
        //console.log(solicitud)
    }, [dispatch, params.solicitudId]);

    const handleClikAprobar = () => {
        dispatch(approveSolicitud(params.solicitudId)).then((response) => {

            if (response.type === "solicitudes/approveSolicitud/fulfilled") {
                console.log(solicitud.usuario.usuarioCorreo)
                registroCompleto(solicitud.usuario.usuarioCorreo)
                dispatch(habilitarUsuario(solicitud.usuario.usuarioId))
                showSuccessMessage('Accion exitosa', 'La solicitud a sido aprobada')
                router.push('/promocion-empresarial/mis-datos/solicitudes')
            } else if (response.type === "solicitudes/approveSolicitud/rejected") {
                showErrorMessage('Error', 'Hubo un problema en aprobar la solicitud');
            }

        })
    }
    const handleClickRechazar = () => {
        dispatch(declineSolicitud(params.solicitudId)).then((response) => {
            if (response.type === "solicitud/declineSolicitud/fulfilled") {
                dispatch(deleteUsuario(solicitud.usuario.usuarioId))
                showSuccessMessage('Accion exitosa', 'La solicitud a sido rechazada')
                router.push('/promocion-empresarial/mis-datos/solicitudes')
            } else if (response.type === "solicitud/declineSolicitud/rejected") {
                showErrorMessage('Error', 'Hubo un problema en rechazar la solicitud');
            }
        })
    }

    if (status === 'loading') return <p>Cargando...</p>;

    if (!solicitud) return <p>No se encontró la solicitud o aún no ha cargado.</p>;

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md my-8">

            <div className="flex justify-start mb-4">
                <button
                    onClick={() => router.push('/promocion-empresarial/mis-datos/solicitudes')}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Regresar
                </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Información del Usuario</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Datos Personales</h3>
                <p className="text-gray-600"><span className="font-medium">Nombre:</span>{solicitud.usuario.usuarioNombre}</p>
                <p className="text-gray-600"><span className="font-medium">Apellido Paterno:</span>{solicitud.usuario.usuarioApellidoPaterno}</p>
                <p className="text-gray-600"><span className="font-medium">Apellido Paterno:</span>{solicitud.usuario.usuarioApellidoMaterno}</p>
                <p className="text-gray-600"><span className="font-medium">DNI:</span>{solicitud.usuario.usuarioDni}</p>
                <p className="text-gray-600"><span className="font-medium">Correo:</span>{solicitud.usuario.usuarioCorreo}</p>
                <p className="text-gray-600"><span className="font-medium">Teléfono:</span>{solicitud.usuario.usuarioTelefono}</p>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Datos de Emprendedor</h3>
                <p className="text-gray-600"><span className="font-medium">RUC:</span>{solicitud.emprendedor.emprendedorRuc}</p>
                <p className="text-gray-600"><span className="font-medium">Razón Social:</span>{solicitud.emprendedor.emprendedorRazonSocial}</p>
                <p className="text-gray-600"><span className="font-medium">Dirección:</span>{solicitud.emprendedor.emprendedorDireccion}</p>
                <p className="text-gray-600"><span className="font-medium">Tipo Actividad:</span>{solicitud.emprendedor.tipoActividad.tipoActividadNombre}</p>
                <p className="text-gray-600"><span className="font-medium">Rubro:</span>{solicitud.emprendedor.rubro.rubroNombre}</p>
            </div>

            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row justify-end">
                <button
                    className="flex items-center p-2 mb-2 md:mr-2 md:mb-0 sm:mb-2 lg:mb-0 xl:mb-0 2xl:mb-0 bg-green-600 text-white 
                    rounded-md hover:bg-green-700 transition-colors text-base"
                    onClick={() => handleClikAprobar()}>
                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                    Aprobar
                </button>

                <button
                    className="flex items-center p-2 md:mb-0 sm:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0 bg-red-600 text-white 
                    rounded-md hover:bg-red-700 transition-colors text-base"
                    onClick={() => handleClickRechazar()}>
                    <FontAwesomeIcon icon={faTimes} className="mr-2" />
                    Rechazar
                </button>
            </div>
        </div>
    )
}

export default Page
