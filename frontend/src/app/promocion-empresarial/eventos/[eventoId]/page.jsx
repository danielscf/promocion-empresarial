'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
import { descargarDiplomas } from '@/api/participacionApi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteParticipacion, fetchParticipacionByEvento } from '@/store/participacionEvento';
import { showConfirmation } from '@/app/utils/confirmationDialog';
import { actualizarAsistencia } from '@/api/participacionApi';

const ParticipantesPage = ({ params }) => {

    const router = useRouter();
    const [cargando, setCargando] = useState(false);
    const dispatch = useDispatch()

    const participantes = useSelector((state) => state.participaciones.participaciones)

    useEffect(() => {

        dispatch(fetchParticipacionByEvento(params.eventoId))

    }, [params.eventoId, dispatch]);

    const handleDescargarDiplomas = async () => {
        setCargando(true);
        try {
            const eventoId = params.eventoId;
            const response = await descargarDiplomas(eventoId);

            const contentDisposition = response.headers['content-disposition'];
            const nombreArchivo = contentDisposition
                ? contentDisposition.split('filename=')[1]
                : `diplomas_evento_${eventoId}.zip`;

            saveAs(response.data, nombreArchivo);
        } catch (error) {
            console.error('Error al descargar el archivo ZIP:', error);
        } finally {
            setCargando(false);
        }
    };

    const eliminarParticipante = useCallback(async (participacionEventoId) => {
    
        try {
            const confirmed = await showConfirmation();
            if (confirmed) {
                dispatch(deleteParticipacion(participacionEventoId))
            }
        } catch (error) {
            console.error('Error al eliminar la participación:', error);
        } 
    }, [dispatch]);

    const actualizarAsistenciaParticipante = useCallback(
        async (participacionEventoId, estado) => {
            try {
                await actualizarAsistencia(participacionEventoId, estado);
                dispatch(fetchParticipacionByEvento(params.eventoId));
            } catch (error) {
                console.error('Error al actualizar la asistencia:', error);
            }
        },
        [dispatch, params.eventoId]
    );

    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: (row) => row?.participacionEventoId,
            sortable: true,
        },
        {
            name: 'NOMBRE EMPRENDEDOR',
            selector: (row) =>
                `${row?.emprendedor?.usuario?.usuarioNombre} ${row?.emprendedor?.usuario?.usuarioApellidoPaterno} ${row?.emprendedor?.usuario?.usuarioApellidoMaterno}`,
            sortable: true,
        },
        {
            name: 'RAZÓN SOCIAL',
            selector: (row) => row?.emprendedor?.emprendedorRazonSocial,
            sortable: true,
        },
        {
            name: 'DIRECCIÓN',
            selector: (row) => row?.emprendedor?.emprendedorDireccion,
            sortable: true,
        },
        {
            name: 'ASISTENCIA',
            cell: (row) => (
                <input
                    className='ml-6'
                    type="checkbox"
                    checked={row?.asistencia === 1}
                    onChange={() => actualizarAsistenciaParticipante(row?.participacionEventoId, row?.asistencia === 1 ? 0 : 1)}
                />
            ),
        },
        {
            name: 'ELIMINAR',
            cell: (row) => (
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer h-6 w-6 ml-3"
                    onClick={() => eliminarParticipante(row?.participacionEventoId)}
                />
            ),
        },
    ], [eliminarParticipante, actualizarAsistenciaParticipante]);

    if (!participantes) {
        return <p>...Cargando</p>;
    }

    const participacionesFiltradas = participantes.filter(participante => participante.estado !== 3 )

    return (
        <div className="p-4 h-screen bg-gray-100">
            <div className="flex justify-start mb-4">
                <button
                    onClick={() => router.push('/promocion-empresarial/eventos')}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Regresar
                </button>
            </div>
            <h1 className="mt-2 text-center text-black text-2xl font-bold">Participantes del Evento</h1>

            <div className="flex justify-end mb-4">

                <button
                    className={`px-4 py-2 my-3 text-white rounded transition ${cargando ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    onClick={handleDescargarDiplomas}
                    disabled={cargando}
                >
                    {cargando ? 'Descargando...' : <><FontAwesomeIcon icon={faDownload} className="mr-2" /> Descargar Diploma</>}
                </button>

            </div>
            <div className="bg-white p-4 mt-6 shadow-lg border border-gray-300  rounded-lg">
                <DataTable
                    columns={columns}
                    data={participacionesFiltradas}
                    pagination
                    highlightOnHover
                    responsive
                />
            </div>
        </div>
    );
};



export default ParticipantesPage
