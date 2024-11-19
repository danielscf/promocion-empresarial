'use client';

import MarcaTable from '@/src/components/marcaTable'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import MarcaForm from '@/src/components/marcaForm'
import Modal from '@/src/components/modal'

const MarcasPage = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='p-4 w-screen bg-gray-300 '>
            <h1 className='mt-2 text-center text-2xl font-bold'>Mis marcas</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={openModal}>
                    Nueva Marca
                </button>
            </div>

            <MarcaTable />

            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Registrar Marca">
                <MarcaForm
                    closeModal={closeModal}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    reset={reset}
                />
            </Modal>
        </div >
    )
}

export default MarcasPage
