'use client'

import React from 'react'
import Modal from '@/src/components/modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Productos = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-4 h-screen w-screen bg-gray-300 "
            style={{ background: 'radial-gradient(circle, rgba(238, 238, 238, 1) 0%, rgba(146, 146, 146, 1) 100%)' }}>
            <h1 className="mt-2 text-center text-2xl font-bold">Productos</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={openModal}
                >
                    Registrar Producto
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">NOMBRE</th>
                            <th className="px-4 py-2 border">DESCRIPCIÓN</th>
                            <th className="px-4 py-2 border">IMAGEN</th>
                            <th className="px-4 py-2 border">EDITAR</th>
                            <th className="px-4 py-2 border text-center">ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 1, nombre: "Polo", descripcion: "color azul", imagen: "" },
                            { id: 2, nombre: "Polo", descripcion: "color azul", imagen: "" },
                            { id: 3, nombre: "Polo", descripcion: "color azul", imagen: "" },
                        ].map((user) => (
                            <tr key={user.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.nombre}</td>
                                <td className="px-4 py-2 border">{user.descripcion}</td>
                                <td className="px-4 py-2 border">{user.imagen}</td>
                                <td className="px-4 py-2 border text-center">
                                    <FontAwesomeIcon icon={faPenToSquare} className="h-6 w-6" />
                                </td>
                                <td className="px-4 py-2 border text-center">
                                    <FontAwesomeIcon icon={faTrash} className="text-red-600 h-6 w-6" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Registrar Producto">
                <form>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('nombre', { required: true })}
                        />
                        {errors.nombre && <span className="text-red-500">El nombre es requerido</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            id="descripcion"
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                            {...register('nombre', { required: true })}
                        />
                        {errors.descripcion && <span className="text-red-500">La descripcion es requerido</span>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1 mr-4">Imagen</label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 hover:border-gray-600 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300">
                            <div className="flex flex-col items-center justify-center">
                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18M13 12h7m0 0v8m0-8V4"></path>
                                </svg>
                                <p className="text-gray-600 mt-2">Subir Imagen</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" />
                        </label>
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

export default Productos