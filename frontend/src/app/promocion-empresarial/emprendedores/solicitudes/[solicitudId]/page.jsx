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
import { linkTerminarRegistro} from '@/api/registroApi';

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
                linkTerminarRegistro(solicitud.usuario.usuarioCorreo)
                dispatch(habilitarUsuario(solicitud.usuario.usuarioId))
                showSuccessMessage('Accion exitosa', 'La solicitud a sido aprobada')
                router.push('/promocion-empresarial/solicitudes')
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
                router.push('/promocion-empresarial/emprendedores/solicitudes')
            } else if (response.type === "solicitud/declineSolicitud/rejected") {
                showErrorMessage('Error', 'Hubo un problema en rechazar la solicitud');
            }
        })
    }

    if (status === 'loading') return <p>Cargando...</p>;

    if (!solicitud) return <p>No se encontró la solicitud o aún no ha cargado.</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start pt-20 pb-10">
            <div className="w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-lg p-8 mx-4">
                {/* Botón de regresar */}
                <div className="flex justify-start mb-6">
                    <button
                        onClick={() => router.push('/promocion-empresarial/solicitudes')}
                        className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Regresar
                    </button>
                </div>

                {/* Título */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Información del Usuario
                </h2>

                {/* Datos Personales */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                        Datos Personales
                    </h3>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Nombre: </span>{solicitud?.usuario?.usuarioNombre}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Apellido Paterno: </span>{solicitud?.usuario?.usuarioApellidoPaterno}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Apellido Materno: </span>{solicitud?.usuario?.usuarioApellidoMaterno}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">DNI: </span>{solicitud?.usuario?.usuarioDni}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Correo: </span>{solicitud?.usuario?.usuarioCorreo}
                    </p>
                    <p className="text-gray-800">
                        <span className="font-medium">Teléfono: </span>{solicitud?.usuario?.usuarioTelefono}
                    </p>
                </div>

                {/* Datos de Emprendedor */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 border-gray-200">
                        Datos de Emprendedor
                    </h3>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">RUC: </span>{solicitud?.emprendedor?.emprendedorRuc}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Razón Social: </span>{solicitud?.emprendedor?.emprendedorRazonSocial}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Dirección: </span>{solicitud?.emprendedor?.emprendedorDireccion}
                    </p>
                    <p className="text-gray-800 mb-2">
                        <span className="font-medium">Tipo Actividad: </span>{solicitud?.emprendedor?.tipoActividad}
                    </p>
                    <p className="text-gray-800">
                        <span className="font-medium">Rubro: </span>{solicitud?.emprendedor?.rubro?.rubroNombre}
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col md:flex-row justify-end gap-4">
                    <button
                        className="flex items-center justify-center px-6 py-3 bg-green-600 text-white 
                        rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-md"
                        onClick={() => handleClikAprobar()}
                    >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Aprobar
                    </button>
                    <button
                        className="flex items-center justify-center px-6 py-3 bg-red-600 text-white 
                       rounded-lg hover:bg-red-700 transition duration-200 font-medium shadow-md"
                        onClick={() => handleClickRechazar()}
                    >
                        <FontAwesomeIcon icon={faTimes} className="mr-2" />
                        Rechazar
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Page
