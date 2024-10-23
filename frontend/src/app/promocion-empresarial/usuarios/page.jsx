'use client';

import React from 'react'
import { useState } from 'react';
import Modal from '@/src/components/modal';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function usuariosPage() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


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
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">NOMBRE</th>
                            <th className="px-4 py-2 border">APELLIDOS</th>
                            <th className="px-4 py-2 border">DNI</th>
                            <th className="px-4 py-2 border">CORREO</th>
                            <th className="px-4 py-2 border">TELEFONO</th>
                            <th className="px-4 py-2 border text-center">ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 1, nombre: "Mark", apellidos: "Otto", dni: "7654332", correo: "@mdo", telefono: "98432842" },
                            { id: 2, nombre: "Jacob", apellidos: "Thornton", dni: "7654333", correo: "@fat", telefono: "98432843" },
                            { id: 3, nombre: "Larry", apellidos: "Bird", dni: "7654334", correo: "@twitter", telefono: "98432844" },
                        ].map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.nombre}</td>
                                <td className="px-4 py-2 border">{user.apellidos}</td>
                                <td className="px-4 py-2 border">{user.dni}</td>
                                <td className="px-4 py-2 border">{user.correo}</td>
                                <td className="px-4 py-2 border">{user.telefono}</td>
                                <td className="px-4 py-2 border text-center">
                                <FontAwesomeIcon icon={faTrash} className="text-red-600 h-6 w-6" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Registrar Usuario">
                <form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input type="text" id="nombre" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('nombre', { required: true })} />
                        {errors.nombre && <span className="text-red-500">El nombre es requerido</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                        <input type="text" id="apellidos" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('apellidos', { required: true })} />
                        {errors.apellidos && <span className="text-red-500">Los apellidos son requeridos</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                        <input type="text" id="dni" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('dni', { required: true })} />
                        {errors.dni && <span className="text-red-500">El dni es requerido</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                        <input type="email" id="correo" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('correo', { required: true })} />
                        {errors.correo && <span className="text-red-500">El correo es requerido</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input type="text" id="telefono" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('telefono', {
                                required: "El teléfono es requerido",
                                pattern: {
                                    value: /^[0-9]{9}$/,
                                    message: "El teléfono debe tener 9 dígitos"
                                }
                            })} />
                        {errors.telefono && <span className="text-red-500">{errors.telefono.message}</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                        <select id="rol" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500" {...register('rol', { required: true })}>
                            <option value="Administrador">Administrador</option>
                            <option value="Operador">Operador</option>
                        </select>
                        {errors.rol && <span className="text-red-500">El rol es requerido</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha Nacimiento</label>
                        <input type="date" id="fecha_nacimiento" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('fecha_nacimiento', { required: true })} />
                        {errors.fecha_nacimiento && <span className="text-red-500">La fecha de nacimiento es requerida</span>}
                    </div>

                    <div className="flex justify-end mt-4">
                        <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2" onClick={closeModal}>
                            Cerrar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Registrar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default usuariosPage
