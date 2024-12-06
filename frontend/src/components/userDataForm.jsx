'use client'

import React, { useEffect, useContext, useState } from 'react'
import { editUsuario } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { showSuccessMessage, showErrorMessage, alertPersonalizado } from '../app/utils/messages';
import { getUsuarioById } from '@/api/userApi';

const UserDataForm = () => {

    const { user, updateUserInContext } = useContext(AuthContext)

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (user?.usuarioId) {
            const cargarDatosUsuario = async () => {
                const response = await getUsuarioById(user?.usuarioId);
                const datos = response.data;
    
                const initialValues = {
                    usuarioUsuario: datos.usuarioUsuario,
                    usuarioNombre: datos.usuarioNombre,
                    usuarioApellidoPaterno: datos.usuarioApellidoPaterno,
                    usuarioApellidoMaterno: datos.usuarioApellidoMaterno,
                    usuarioDni: datos.usuarioDni,
                    usuarioTelefono: datos.usuarioTelefono,
                    usuarioCorreo: datos.usuarioCorreo
                };
    
                setValue("usuarioUsuario", datos.usuarioUsuario);
                setValue("usuarioNombre", datos.usuarioNombre);
                setValue("usuarioApellidoPaterno", datos.usuarioApellidoPaterno);
                setValue("usuarioApellidoMaterno", datos.usuarioApellidoMaterno);
                setValue("usuarioDni", datos.usuarioDni);
                setValue("usuarioTelefono", datos.usuarioTelefono);
                setValue("usuarioCorreo", datos.usuarioCorreo);
    
                setInitialData(initialValues); 
            };
            cargarDatosUsuario();
        }
    }, [user, setValue]);
    

    if (!user) {
        return <p>...Cargando</p>
    }

    const restringirCantidadDigitos = (e) => {
        const digitos = e.target.value.replace(/\D/g, "");

        if (digitos.length > 9) {
            e.target.value = digitos.slice(0, 9);
            alertPersonalizado('', 'El teléfono debe tener 9 dígitos');
        }
    };

    const onSubmit = async (data) => {

        if (JSON.stringify(data) === JSON.stringify(initialData)) {
            alertPersonalizado("", "No se han realizado cambios en el formulario.");
            return;
        }

        const usuario = {
            ...data,
            usuarioId: user?.usuarioId,
            usuarioFechaCreacion: user?.usuarioFechaCreacion,
            usuarioContrasena: user?.usuarioContrasena,
            usuarioEstado: user?.usuarioEstado,
            usuarioFechaNacimiento: user?.usuarioFechaNacimiento,
            roles: [
                {
                    rolId: user?.roles?.[0]?.rolId,
                    rolNombre: user?.roles?.[0]?.rolNombre
                }
            ]
        };
        dispatch(editUsuario(usuario)).then((response) => {
            //console.log(response)
            if (response.type === "usuarios/editUsuario/fulfilled") {
                showSuccessMessage('Editado exitosamente', 'Los datos del usuario se han editado con exito');
                updateUserInContext(response.payload)
                reset();
            } else if (response.type === "usuarios/editUsuario/rejected") {
                showErrorMessage('Error en la edicion', 'Hubo un problema en editar los datos del usuario');
                //console.log(response)
            }
        })

        // console.log(usuario);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Nombre de Usuario */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Nombre de Usuario
                            </label>
                            <input
                                type="text"
                                {...register("usuarioUsuario", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                readOnly
                            />
                            {errors.usuarioUsuario && <p className="text-red-500 text-sm">{errors.usuarioUsuario.message}</p>}
                        </div>


                        {/* Nombres */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Nombres
                            </label>
                            <input
                                type="text"
                                {...register("usuarioNombre", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                readOnly
                            />
                            {errors.usuarioNombre && <p className="text-red-500 text-sm">{errors.usuarioNombre.message}</p>}
                        </div>

                        {/* Apellido Paterno */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Apellido Paterno
                            </label>
                            <input
                                type="text"
                                {...register("usuarioApellidoPaterno", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                readOnly
                            />
                            {errors.usuarioApellidoPaterno && <p className="text-red-500 text-sm">{errors.usuarioApellidoPaterno.message}</p>}
                        </div>

                        {/* Apellido Materno */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
                                Apellido Materno
                            </label>
                            <input
                                type="text"
                                {...register("usuarioApellidoMaterno", { required: "Este campo es obligatorio" })}
                                className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                readOnly
                            />
                            {errors.usuarioApellidoMaterno && <p className="text-red-500 text-sm">{errors.usuarioApellidoMaterno.message}</p>}
                        </div>

                        {/* DNI */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
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
                                className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                readOnly
                            />
                            {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
                        </div>

                        {/* Teléfono */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-black">
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
                                onChange={(e) => {
                                    restringirCantidadDigitos(e);
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.usuarioTelefono && <span className="text-red-500">{errors.usuarioTelefono.message}</span>}
                        </div>

                        {/* Correo */}
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium leading-6 text-black">
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
                                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

export default UserDataForm
