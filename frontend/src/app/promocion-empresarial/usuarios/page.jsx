'use client';

import React from 'react'
import { useState } from 'react';
import Modal from '@/src/components/modal';
import UserTable from '@/src/components/userTable';
import UserForm from '@/src/components/userForm';
import { useForm } from 'react-hook-form';

function usuariosPage() {

    const { register, handleSubmit,reset, formState: { errors }} = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-4 bg-gray-300">
            <h1 className="mt-2 text-center text-2xl font-bold">Usuarios</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={openModal}
                >
                    Nuevo Usuario
                </button>
            </div>

            <UserTable/>

            <Modal isOpen={isModalOpen}  handleClose={closeModal} title="Registrar Usuario">
                <UserForm
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

export default usuariosPage
