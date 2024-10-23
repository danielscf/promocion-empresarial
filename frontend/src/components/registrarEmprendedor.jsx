import React from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const registrarEmprendedor = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [fotoEmprendedor, setFotoEmprendedor] = useState(null);
    const [fotoMarca, setFotoMarca] = useState(null);

    // Función para manejar la selección de la foto del emprendedor
    const handleEmprendedorImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFotoEmprendedor(URL.createObjectURL(file));
        }
    };

    // Función para manejar la selección de la foto de la marca
    const handleMarcaImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFotoMarca(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data) => {

        console.log(data);
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-bold mb-6">Registro de Emprendedor</h2>
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b w-full border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">

                            {/* Datos de Usuario */}
                            <h3 className="text-xl font-bold mb-4 col-span-6">Datos de Usuario</h3>

                            <div className="flex md:flex-row justify-center items-center col-span-6">   
                                <input
                                    id="dni"
                                    name="dni"
                                    type="text"
                                    placeholder='Ingresar dni'
                                    className="w-full md:w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                            </div>

                            {/* Nombre de Usuario */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="nombre_usuario" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre de Usuario
                                </label>
                                <input
                                    id="nombre_usuario"
                                    name="nombre_usuario"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Nombres */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombres
                                </label>
                                <input
                                    id="nombres"
                                    name="nombres"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Apellido Paterno */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="apellido-paterno" className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido Paterno
                                </label>
                                <input
                                    id="apellido-paterno"
                                    name="apellido-paterno"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Apellido Materno */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="apellido-materno" className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido Materno
                                </label>
                                <input
                                    id="apellido-materno"
                                    name="apellido-materno"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Teléfono */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                                    Teléfono
                                </label>
                                <input
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Correo */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="correo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Correo
                                </label>
                                <input
                                    id="correo"
                                    name="correo"
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Fecha de nacimiento */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha de nacimiento
                                </label>
                                <input
                                    id="fecha_nacimiento"
                                    name="fecha_nacimiento"
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Contraseña */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="contrasena" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <input
                                    id="contrasena"
                                    name="contrasena"
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Datos de Emprendedor */}
                            <h3 className="text-xl font-bold mb-4 col-span-6">Datos de Emprendedor</h3>

                            <div className="flex md:flex-row justify-center items-center col-span-6">   
                                <input
                                    id="ruc"
                                    name="ruc"
                                    type="text"
                                    placeholder='Ingresar ruc'
                                    className="w-full md:w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                            </div>

                            {/* Dirección */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Dirección
                                </label>
                                <input
                                    id="direccion"
                                    name="direccion"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Razon Social */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="razon_social" className="block text-sm font-medium leading-6 text-gray-900">
                                    Razón Social
                                </label>
                                <input
                                    id="razon_social"
                                    name="razon_social"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Estado Contribuyente */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="estado_contribuyente" className="block text-sm font-medium leading-6 text-gray-900">
                                    Estado Contribuyente
                                </label>
                                <input
                                    id="estado_contribuyente"
                                    name="estado_contribuyente"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Condición Contribuyente */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="condicion_contribuyente" className="block text-sm font-medium leading-6 text-gray-900">
                                    Condición Contribuyente
                                </label>
                                <input
                                    id="condicion_contribuyente"
                                    name="condicion_contribuyente"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Nombre Marca */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="marca" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre Marca
                                </label>
                                <input
                                    id="marca"
                                    name="marca"
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {/* Rubro */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rubro
                                </label>
                                <select
                                    id="rubro"
                                    name="rubr_nombre"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option selected>Selecciona uno de los rubros</option>
                                </select>
                            </div>

                            {/* Foto del Emprendedor */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                                    Foto del emprendedor
                                </label>
                                {fotoEmprendedor && (
                                    <img
                                        src={fotoEmprendedor}
                                        alt="Foto del Emprendedor"
                                        className="h-16 w-16 object-cover rounded-lg shadow-lg border border-gray-200 mt-2"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                    onChange={handleEmprendedorImageChange}
                                />
                            </div>

                            {/* Foto de la Marca */}
                            <div className="col-span-6 md:col-span-2 lg:col-span-3">
                                <label htmlFor="marca" className="block text-sm font-medium leading-6 text-gray-900">
                                    Foto de la Marca
                                </label>
                                {fotoMarca && (
                                    <img
                                        src={fotoMarca}
                                        alt="Logo de la Marca"
                                        className="h-16 w-16 object-cover rounded-lg shadow-lg border border-gray-200 mt-2"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                    onChange={handleMarcaImageChange}
                                />
                            </div>

                            {/* Botón Registrar */}
                            <div class="mt-6 flex justify-end col-span-6">
                                <button type="submit" class="rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </div>


    )
}

export default registrarEmprendedor