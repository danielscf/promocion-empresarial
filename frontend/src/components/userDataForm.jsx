'use client'

import React, { useEffect, useContext } from 'react'
import { editUsuario } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { showSuccessMessage, showErrorMessage } from '../app/utils/messages';

const userDataForm = () => {

    const { user,updateUserInContext } = useContext(AuthContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        reset({
            usuarioNombre: user?.usuarioNombre,
            usuarioApellidoPaterno: user?.usuarioApellidoPaterno,
            usuarioApellidoMaterno: user?.usuarioApellidoMaterno,
            usuarioDni: user?.usuarioDni,
            usuarioTelefono: user?.usuarioTelefono,
            usuarioCorreo: user?.usuarioCorreo,
            usuarioUsuario: user?.usuarioUsuario,
        });
    }, [user, reset]);

    const onSubmit = async (data) => {
        const usuario = {
            ...data,
            usuarioId: user.usuarioId,
            usuarioFechaCreacion: user.usuarioFechaCreacion,
            usuarioContrasena: user.usuarioContrasena,
            usuarioEstado: user.usuarioEstado,
            usuarioFechaNacimiento: user.usuarioFechaNacimiento,
            roles: [
                {
                    rolId: user.roles[0].rolId,
                    rolNombre: user.roles[0].rolNombre
                }
            ]
        };
        dispatch(editUsuario(usuario)).then((response) => {
            console.log(response)
            if (response.type === "usuarios/editUsuario/fulfilled") {
                showSuccessMessage('Editado exitosamente', 'Los datos del usuario se han editado con exito');
                updateUserInContext(response.payload)
                reset();
            } else if (response.type === "usuarios/editUsuario/rejected") {
                showErrorMessage('Error en la edicion','Hubo un problema en editar los datos del usuario');
                console.log(response)
            }
        })

        console.log(usuario);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Nombre de Usuario */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre de Usuario
                            </label>
                            <input
                                type="text"
                                {...register("usuarioUsuario", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.usuarioUsuario && <p className="text-red-500 text-sm">{errors.usuarioUsuario.message}</p>}
                        </div>

                        {/* Nombres */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Nombres
                            </label>
                            <input
                                type="text"
                                {...register("usuarioNombre", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.usuarioNombre && <p className="text-red-500 text-sm">{errors.usuarioNombre.message}</p>}
                        </div>

                        {/* Apellido Paterno */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido Paterno
                            </label>
                            <input
                                type="text"
                                {...register("usuarioApellidoPaterno", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.usuarioApellidoPaterno && <p className="text-red-500 text-sm">{errors.usuarioApellidoPaterno.message}</p>}
                        </div>

                        {/* Apellido Materno */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido Materno
                            </label>
                            <input
                                type="text"
                                {...register("usuarioApellidoMaterno", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.usuarioApellidoMaterno && <p className="text-red-500 text-sm">{errors.usuarioApellidoMaterno.message}</p>}
                        </div>

                        {/* DNI */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                DNI
                            </label>
                            <input
                                type="text"
                                {...register('usuarioDni', {
                                    required: "El Dni es requerido",
                                    pattern: {
                                        value: /^\d{8}$/,
                                        message: "El DNI debe tener 8 dígitos"
                                    }
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
                        </div>

                        {/* Teléfono */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                {...register('usuarioTelefono', {
                                    required: "El teléfono es requerido",
                                    pattern: {
                                        value: /^[0-9]{9}$/,
                                        message: "El teléfono debe tener 9 dígitos"
                                    }
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.usuarioTelefono && <span className="text-red-500">{errors.usuarioTelefono.message}</span>}
                        </div>

                        {/* Correo */}
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Correo
                            </label>
                            <input
                                type="email"
                                {...register('usuarioCorreo', {
                                    required: "El correo es requerido",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Formato de correo inválido"
                                    }
                                })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
                        </div>

                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="rounded-md text-sm font-semibold leading-6 px-3 py-2 bg-indigo-600 text-white">
                        Editar
                    </button>

                </div>
            </div>
        </form>
    )
}

export default userDataForm
