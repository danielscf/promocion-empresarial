'use client'

import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/components/modal'
import EventoTable from '@/components/eventoTable'
import EventoForm from '@/components/eventoForm'


const EventosPage = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    
    return (
        <div className="p-4 h-screen bg-gray-300">
            <h1 className="mt-2 text-center text-2xl font-bold">Eventos</h1>
            <div className="flex justify-end mb-4">

                <button
                    className="px-4 py-2 my-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => openModal()}
                >
                    Nuevo Evento
                </button>

            </div>

            <EventoTable />

             <Modal isOpen={isModalOpen} handleClose={() => { closeModal(); reset(); }} title="Registrar Evento">
                <EventoForm
                    closeModal={closeModal}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    reset={reset}
                />
            </Modal> 
        </div>
    )
}

export default EventosPage
