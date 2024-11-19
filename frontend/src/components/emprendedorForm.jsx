'use client'

import React, { useEffect, useState } from 'react'
import { showSuccessMessage, showErrorMessage } from '../app/utils/messages'
import { editEmprendedor,fetchEmprendedor } from '../store/emprendedorSlice'
import { useEmprendedor } from '../context/EmprendedorContext'

const EmprendedorForm = ({ user_emprendedor, handleSubmit, register, errors, dispatch, setValue,user }) => {
    const [emprendedor, setEmprendedor] = useState(user_emprendedor || {});
    const [selectedFoto, setSelectedFoto] = useState(null);
    const [refreshFoto, setRefreshFoto] = useState(false);
    const { setEmprendedorId } = useEmprendedor();

    const handleFotoChange = (e) => {
        setSelectedFoto(e.target.files[0]);
    };

    useEffect(() => {
        if (user_emprendedor) {
            setEmprendedor(user_emprendedor);
            setEmprendedorId(user_emprendedor.emprendedorId);
            setFormValues(user_emprendedor);
        }
    }, [user_emprendedor]);


    const setFormValues = (emprendedorData) => {
        setValue('emprendedorRuc', emprendedorData.emprendedorRuc);
        setValue('emprendedorDireccion', emprendedorData.emprendedorDireccion);
        setValue('emprendedorRazonSocial', emprendedorData.emprendedorRazonSocial);
        setValue('rubroNombre', emprendedorData.rubro ? emprendedorData.rubro.rubroNombre : '');
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
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
                    "tipoActividadNombre": emprendedor.tipoActividad.tipoActividadNombre
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
                "emprendedorEstadoContribuyente": emprendedor.emprendedorEstadoContribuyente,
            };

            formData.append('foto', selectedFoto);
            formData.append('emprendedor', JSON.stringify(datos_emprendedor));
            formData.append('id', emprendedor.emprendedorId);

            dispatch(editEmprendedor(formData)).then((response) => {
                if (response.type === 'emprendedor/editEmprendedor/fulfilled') {
                    showSuccessMessage('Edición exitosa', 'La edición se ha realizado con éxito');
                    setEmprendedor((prev) => ({ ...prev, ...datos_emprendedor }));
                    setFormValues(datos_emprendedor);
                    setSelectedFoto(null); 
                    dispatch(fetchEmprendedor(user?.usuarioUsuario));                 
                } else {
                    const errorMessage = response.error?.message || 'Hubo un problema al realizar la edición. Verifica los datos e intenta nuevamente.';
                    showErrorMessage('Error en la edición', errorMessage);
                }
            });

        } catch (error) {
            console.error("Error inesperado:", error);
            showErrorMessage('Error inesperado', error.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.');
        }
    };

    return (

        <>
            {emprendedor ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                {/* Mostrar Foto */}
                                {emprendedor?.emprendedorFoto && (
                                    <div className="col-span-full">
                                        <img
                                            key={refreshFoto} 
                                            src={
                                                selectedFoto
                                                    ? URL.createObjectURL(selectedFoto) 
                                                    : `${process.env.NEXT_PUBLIC_API_URL}/emprendedor/${emprendedor.emprendedorId}/foto?timestamp=${new Date().getTime()}` 
                                            }
                                            alt="Foto del emprendedor"
                                            className="rounded-md w-40 h-40 object-cover"
                                        />
                                    </div>
                                )}

                                {/* Cambiar Foto */}
                                <div className='col-span-full'>
                                    <label htmlFor='foto' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cambiar Foto</label>
                                    <input
                                        className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFotoChange}
                                    />
                                </div>

                                {/* Mostrar RUC */}
                                {emprendedor?.emprendedorRuc && (
                                    <div className="sm:col-span-3">
                                        <label htmlFor="ruc" className="block text-sm font-medium leading-6 text-gray-900">Ruc</label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...register("emprendedorRuc", { required: "Este campo es obligatorio" })}
                                            />
                                            {errors.emprendedorRuc && <p className="text-red-500 text-sm">{errors.emprendedorRuc.message}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Mostrar Dirección */}
                                {emprendedor?.emprendedorDireccion && (
                                    <div className="sm:col-span-3">
                                        <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...register("emprendedorDireccion", { required: "Este campo es obligatorio" })}
                                            />
                                            {errors.emprendedorDireccion && <p className="text-red-500 text-sm">{errors.emprendedorDireccion.message}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Mostrar Razón Social */}
                                {emprendedor?.emprendedorRazonSocial && (
                                    <div className="sm:col-span-6">
                                        <label htmlFor="razon-social" className="block text-sm font-medium leading-6 text-gray-900">Razón Social</label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...register("emprendedorRazonSocial", { required: "Este campo es obligatorio" })}
                                            />
                                            {errors.emprendedorRazonSocial && <p className="text-red-500 text-sm">{errors.emprendedorRazonSocial.message}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Mostrar Rubro */}
                                {emprendedor?.rubro?.rubroNombre && (
                                    <div className="col-span-full">
                                        <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-gray-900">Rubro</label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                {...register("rubroNombre", { required: "Este campo es obligatorio" })}
                                            />
                                            {errors.rubroNombre && <p className="text-red-500 text-sm">{errors.rubroNombre.message}</p>}
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="submit" className="rounded-md text-sm font-semibold leading-6 px-3 py-2 bg-indigo-600 text-white">
                                Editar
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <p>Cargando...</p>
            )}
        </>
    )
}

export default EmprendedorForm