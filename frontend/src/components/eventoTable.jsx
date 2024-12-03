
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal';
import { fetchEventos } from '@/store/eventoSlice';
import DataTable from 'react-data-table-component';
import EventoEditForm from './eventoEditForm';
import ParticipanteForm from './participanteForm';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EventoTable = () => {

    const dispatch = useDispatch();
    const eventos = useSelector((state) => state.eventos.eventos)
    const [eventoId, seteventoId] = useState(null)

    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalName) => setActiveModal(modalName);
    const closeModal = () => setActiveModal(null);



    useEffect(() => {
        console.log(eventos)
        dispatch(fetchEventos())

    }, [dispatch])


    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: row => row.eventoId,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.eventoNombre,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.eventoDescripcion,
            sortable: true,
        },
        {
            name: 'FECHA INICIO',
            selector: row => row.eventoFechaInicio,
            sortable: true,
        },
        {
            name: 'FECHA FIN',
            selector: row => row.eventoFechaFin,
            sortable: true,
        },
        {
            name: 'HORA INICIO',
            selector: row => row.eventoHoraInicio,
            sortable: true,
        },
        {
            name: 'HORA FIN',
            selector: row => row.eventoHoraFin,
            sortable: true,
        },
        {
            name: 'LUGAR',
            selector: row => row.eventoLugar,
            sortable: true,
        },
        {
            name: 'TIPO EVENTO',
            selector: row => row.tipoEvento,
            sortable: true,
        },
        {
            name: 'AGREGAR',
            cell: row => (
                <FontAwesomeIcon className='cursor-pointer h-6 w-6 ml-3'
                    icon={faPlus}
                    onClick={() => {
                        seteventoId(row.eventoId);
                        openModal('registrarParticipantes')
                    }}
                />
            ),
            ignoreRowClick: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <FontAwesomeIcon className='cursor-pointer h-6 w-6 ml-3'
                    icon={faPenToSquare}
                    onClick={() => {
                        seteventoId(row.eventoId);
                        openModal("editarEvento");
                    }}
                />
            ),
            ignoreRowClick: true,
        },
        {
            name: 'PARTICIPANTES',
            cell: row => (
                <Link href={`/promocion-empresarial/eventos/${row.eventoId}`}>
                    <FontAwesomeIcon
                        className='cursor-pointer h-6 w-6 ml-8'
                        icon={faUsers}
                    />
                </Link>
            ),
            ignoreRowClick: true,
        },
    ], [seteventoId, openModal]);

    return (
        <div className="overflow-hidden max-w-full border border-gray-300 rounded-lg shadow-md">
            <DataTable
                title="Lista de Eventos"
                columns={columns}
                data={eventos}
                pagination
                className="min-w-full"
            />
            <Modal isOpen={activeModal === "editarEvento"} handleClose={closeModal} title="Editar Evento">
                <EventoEditForm
                    closeModal={closeModal}
                    eventoId={eventoId}
                />
            </Modal>
            <Modal isOpen={activeModal === "registrarParticipantes"} handleClose={closeModal} title="Registrar Participantes">
                <ParticipanteForm
                    closeModal={closeModal}
                    eventoId={eventoId}
                />
            </Modal>
        </div>
    )
}

export default EventoTable
