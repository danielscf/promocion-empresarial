'use client';

import React from 'react'
import { useState } from 'react';
import Modal from '@/components/modal';
import UserTable from '@/components/userTable';
import UserForm from '@/components/userForm';
import { useForm } from 'react-hook-form';

function UsuariosPage() {

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-4 bg-gray-100">
            <h1 className="mt-2 text-center text-2xl text-black font-bold">Usuarios</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 my-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => openModal()}
                >
                    Nuevo Usuario
                </button>
            </div>

            <UserTable />

            <Modal isOpen={isModalOpen} handleClose={() => { closeModal(); reset(); }} title="Registrar Usuario">
                <UserForm
                    closeModal={closeModal}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    reset={reset}
                    setValue={setValue}
                />
            </Modal>
        </div>
    )
}

export default UsuariosPage
