'use client';

import React from 'react'
import { useState } from 'react';
import Modal from '@/src/components/modal';
import UserTable from '@/src/components/userTable';
import UserForm from '@/src/components/userForm';
import { useForm } from 'react-hook-form';

function usuariosPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const users = [
        { id: 1, nombre: "Mark", apellidos: "Otto", dni: "7654332", correo: "@mdo", telefono: "98432842" },
        { id: 2, nombre: "Jacob", apellidos: "Thornton", dni: "7654333", correo: "@fat", telefono: "98432843" },
        { id: 3, nombre: "Larry", apellidos: "Bird", dni: "7654334", correo: "@twitter", telefono: "98432844" },
    ];

    return (
        <div className="p-4 h-screen bg-gray-300">
            <h1 className="mt-2 text-center text-2xl font-bold">Usuarios</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={openModal}
                >
                    Nuevo Usuario
                </button>
            </div>

            <UserTable users={users} />

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Registrar Usuario">
                <UserForm
                    closeModal={closeModal}
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                />
            </Modal>
        </div>
    )
}

export default usuariosPage
