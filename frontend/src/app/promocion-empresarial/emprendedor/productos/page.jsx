'use client'

import React from 'react'
import Modal from '@/src/components/modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ProductoForm from '@/src/components/productoForm';
import ProductoTable from '@/src/components/productoTable';

const Productos = () => {

    const { register, handleSubmit,reset, formState: { errors }, setValue } = useForm()


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-4 h-full min-h-screen w-full overflow-x-auto bg-gray-300">
            <h1 className="mt-2 text-center text-2xl font-bold">Productos</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={openModal}
                >
                    Registrar Producto
                </button>
            </div>

            <ProductoTable />
            
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Registrar Producto">

                <ProductoForm 
                 register={register}
                 handleSubmit={handleSubmit}
                 errors={errors}
                 reset={reset}
                 closeModal={closeModal}
                 />

            </Modal>
        </div>
    )
}

export default Productos