'use client'

import React,{useEffect} from 'react'
import { showSuccessMessage,showErrorMessage } from '../app/utils/messages'
import { editEmprendedor } from '../store/emprendedorSlice'

const EmprendedorForm = ({ reset, emprendedor, handleSubmit, register, errors,dispatch }) => {

    useEffect(() => {

        reset({
            emprendedorFoto: emprendedor.emprendedorFoto,
            emprendedorRuc: emprendedor.emprendedorRuc,
            emprendedorDireccion: emprendedor.emprendedorDireccion,
            emprendedorRazonSocial: emprendedor.emprendedorRazonSocial,
            rubroNombre: emprendedor.rubro ? emprendedor.rubro.rubroNombre : ''
        });

    }, [emprendedor])

    const onSubmit = async (data) => {
        const datos_emprendedor = {
            ...data,
            "usuario": {
                "usuarioUsuario": emprendedor.usuario.usuarioUsuario,
                "usuarioNombre": emprendedor.usuario.usuarioNombre,
                "usuarioDni": emprendedor.usuario.usuarioDni,
                "usuarioCorreo": emprendedor.usuario.usuarioCorreo,
                "usuarioTelefono": emprendedor.usuario.usuarioTelefono,
                "usuarioId": emprendedor.usuario.usuarioId,
                "usuarioEstado": emprendedor.usuario.usuarioEstado,
                "usuarioApellidoPaterno": emprendedor.usuario.usuarioApellidoPaterno,
                "usuarioApellidoMaterno": emprendedor.usuario.usuarioApellidoMaterno,
                "usuarioContrasena": emprendedor.usuario.usuarioContrasena,
                "usuarioFechaNacimiento": emprendedor.usuario.usuarioFechaNacimiento,
                "usuarioFechaCreacion": emprendedor.usuario.usuarioFechaCreacion
            },
            "emprendedorId": emprendedor.emprendedorId,
            "tipoActividad": {
                "tipoActividadId": emprendedor.tipoActividad.tipoActividadId,
                "tipoActividadNombre": emprendedor.tipoActividad.Nombre
            },
            "rubro": {
                "rubroId": emprendedor.rubro.rubroId,
                "rubroNombre": emprendedor.rubro.rubroNombre
            },
            "emprendedorCondicionContribuyente": emprendedor.emprendedorCondicionContribuyente,
            "tipoContribuyente": {
                "tipoContribuyenteNombre": emprendedor.tipoContribuyente.tipoContribuyenteNombre,
                "tipoContribuyenteId": emprendedor.tipoContribuyente.tipoContribuyenteId
            },
            "emprendedorEstadoContribuyente": emprendedor.emprendedorCondicionContribuyente,
        }

        dispatch(editEmprendedor(datos_emprendedor)).then((response) => {
            if (response.type === 'emprendedor/editEmprendedor/fulfilled') {
                showSuccessMessage('Edicion exitosa', 'La edicion se ha realizado con exito')
                reset()
            } else if (response.type === 'emprendedor/editEmprendedor/rejected') {
                showErrorMessage('Error en la edicion', 'Hubo un problema en realzar la edicion')
            }
        })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Foto */}
                        <div className="col-span-full">
                            <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                                Foto
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("emprendedorFoto", { required: "Este campo es obligatorio" })}
                                />
                                {errors.emprendedorFoto && <p className="text-red-500 text-sm">{errors.emprendedorFoto.message}</p>}

                            </div>
                        </div>

                        {/* ruc */}
                        <div className="sm:col-span-3">
                            <label htmlFor="ruc" className="block text-sm font-medium leading-6 text-gray-900">
                                Ruc
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("emprendedorRuc", { required: "Este campo es obligatorio" })}
                                />
                                {errors.emprendedorRuc && <p className="text-red-500 text-sm">{errors.emprendedorRuc.message}</p>}
                            </div>
                        </div>


                        {/* Direccion */}
                        <div className="sm:col-span-3">
                            <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                Direccion
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("emprendedorDireccion", { required: "Este campo es obligatorio" })}
                                />
                                {errors.emprendedorDireccion && <p className="text-red-500 text-sm">{errors.emprendedorDireccion.message}</p>}
                            </div>
                        </div>

                        {/* Razón Social */}
                        <div className="sm:col-span-6">
                            <label htmlFor="razon-social" className="block text-sm font-medium leading-6 text-gray-900">
                                Razón Social
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register("emprendedorRazonSocial", { required: "Este campo es obligatorio" })}
                                />
                                {errors.emprendedorRazonSocial && <p className="text-red-500 text-sm">{errors.emprendedorRazonSocial.message}</p>}
                            </div>
                        </div>

                        {/* Rubro */}
                        <div className="col-span-full">
                            <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-gray-900">
                                Rubro
                            </label>
                            <div className="mt-2">
                                <div className="mt-2">
                                    <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        {...register("rubroNombre", { required: "Este campo es obligatorio" })}
                                    />
                                    {errors.rubroNombre && <p className="text-red-500 text-sm">{errors.rubroNombre.message}</p>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="rounded-md text-sm font-semibold leading-6 px-3 py-2 bg-indigo-600 text-white">
                        Editar
                    </button>

                </div>
            </div>
        </form >
    )
}

export default EmprendedorForm
