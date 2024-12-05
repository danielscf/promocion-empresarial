'use client';

import MarcaTable from '@/components/marcaTable';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import MarcaForm from '@/components/marcaForm';
import Modal from '@/components/modal';

const MarcasPage = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='p-4 h-full min-h-screen w-full overflow-x-auto bg-gray-300'>
            <h1 className='mt-2 text-center text-2xl font-bold'>Mis marcas</h1>
            <div className="flex justify-end my-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={openModal}>
                    Nueva Marca
                </button>
            </div>

            <MarcaTable />

            <Modal isOpen={isModalOpen} handleClose={() =>{ reset(); closeModal()}} title="Registrar Marca">
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
