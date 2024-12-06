'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { showSuccessMessage, showErrorMessage, alertPersonalizado } from '../app/utils/messages'
import { editEmprendedor, fetchEmprendedor } from '../store/emprendedorSlice'
import { useEmprendedor } from '../context/EmprendedorContext'
import Image from 'next/image'
import QRCode from 'react-qr-code'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const EmprendedorForm = ({ user_emprendedor, handleSubmit, register, errors, dispatch, setValue, user }) => {
    const [emprendedor, setEmprendedor] = useState(user_emprendedor ?? {
        usuario: {},
        tipoActividad: {},
        rubro: {},
        tipoContribuyente: {},
    });
    const value = `http://129.151.39.237/informacion-emprendedor/${emprendedor?.usuario?.usuarioUsuario}`;
    const qrRef = useRef();
    const [selectedFoto, setSelectedFoto] = useState(null);
    const { setEmprendedorId } = useEmprendedor();

    const handleGeneratePDF = async () => {
        const qrElement = qrRef.current;
        const canvas = await html2canvas(qrElement);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text("Código QR", 10, 10);
        pdf.addImage(imgData, "PNG", 10, 20, 100, 100);
        pdf.save("codigo-qr.pdf");
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
           
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                showErrorMessage('Archivo no válido', 'Por favor selecciona una imagen en formato JPEG, PNG o GIF.');
                e.target.value = ''; 
                setSelectedFoto(null);
                return;
            }
    
            if (file.size > 5 * 1024 * 1024) { 
                showErrorMessage('Archivo demasiado grande', 'El archivo debe ser menor a 5 MB.');
                e.target.value = ''; 
                setSelectedFoto(null);
                return;
            }
    
            setSelectedFoto(file);
        }
    };

    const setFormValues = useCallback((emprendedorData) => {
        setValue('usuarioUsuario', emprendedorData.usuario?.usuarioUsuario)
        setValue('usuarioNombre', emprendedorData.usuario?.usuarioNombre)
        setValue('usuarioApellidoPaterno', emprendedorData.usuario?.usuarioApellidoPaterno)
        setValue('usuarioApellidoMaterno', emprendedorData.usuario?.usuarioApellidoMaterno)
        setValue('usuarioDni', emprendedorData.usuario?.usuarioDni)
        setValue('usuarioCorreo', emprendedorData.usuario?.usuarioCorreo)
        setValue('usuarioTelefono', emprendedorData.usuario?.usuarioTelefono)
        setValue('emprendedorRuc', emprendedorData.emprendedorRuc);
        setValue('emprendedorDireccion', emprendedorData.emprendedorDireccion);
        setValue('emprendedorRazonSocial', emprendedorData.emprendedorRazonSocial);
        setValue('rubroNombre', emprendedorData.rubro?.rubroNombre || '');
    }, [setValue]);

    useEffect(() => {
        if (user_emprendedor) {
            setEmprendedor(user_emprendedor);
            setEmprendedorId(user_emprendedor.emprendedorId);
            setFormValues(user_emprendedor);
        }
    }, [user_emprendedor, setEmprendedorId, setFormValues]);



    const onSubmit = async (data) => {
        try {

            const initialData = {
                usuarioUsuario: emprendedor?.usuario.usuarioUsuario,
                usuarioNombre: emprendedor?.usuario.usuarioNombre,
                usuarioApellidoPaterno: emprendedor?.usuario.usuarioApellidoPaterno,
                usuarioApellidoMaterno: emprendedor?.usuario.usuarioApellidoMaterno,
                usuarioDni: emprendedor?.usuario.usuarioDni,
                usuarioTelefono: emprendedor?.usuario.usuarioTelefono,
                usuarioCorreo: emprendedor?.usuario.usuarioCorreo,
                emprendedorRuc: emprendedor?.emprendedorRuc,
                emprendedorDireccion: emprendedor?.emprendedorDireccion,
                emprendedorRazonSocial: emprendedor?.emprendedorRazonSocial,
                rubroNombre: emprendedor?.rubro?.rubroNombre,
            };
            // console.log(initialData)
            // console.log(data)

            const formDataIsEqual = JSON.stringify(data) === JSON.stringify(initialData);

            const photoIsUnchanged = !selectedFoto;

            if (formDataIsEqual && photoIsUnchanged) {
                alertPersonalizado('Sin cambios', 'No se han realizado cambios en el formulario.');
                return;
            }

            const formData = new FormData();
            const datos_emprendedor = {
                ...data,
                usuario: {
                    ...emprendedor.usuario,
                    usuarioCorreo: data.usuarioCorreo,
                    usuarioTelefono: data.usuarioTelefono,
                },
                emprendedorId: emprendedor.emprendedorId,
                tipoActividad: emprendedor.tipoActividad,
                rubro: emprendedor.rubro,
                tipoContribuyente: emprendedor.tipoContribuyente,
                emprendedorEstadoContribuyente: emprendedor.emprendedorEstadoContribuyente,
                emprendedorCondicionContribuyente: emprendedor.emprendedorCondicionContribuyente
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
                <div>
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
                                            readOnly />
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
                                            readOnly />
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
                                            readOnly />
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
                                            readOnly />
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
                                            readOnly />
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

                                    {/* Mostrar Foto */}
                                    {emprendedor?.emprendedorFoto && (
                                        <div className="col-span-full">
                                            <Image
                                                src={
                                                    selectedFoto
                                                        ? URL.createObjectURL(selectedFoto)
                                                        : `${process.env.NEXT_PUBLIC_API_URL}/emprendedor/${emprendedor.emprendedorId}/foto?timestamp=${new Date().getTime()}`
                                                }
                                                alt="Foto del emprendedor"
                                                className="rounded-md w-40 h-40 object-cover"
                                                width={100}
                                                height={200}
                                            />

                                        </div>
                                    )}

                                    {/* Cambiar Foto */}
                                    <div className='col-span-full'>
                                        <label htmlFor='foto' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cambiar Foto</label>
                                        <input
                                            className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 
                                            file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                                            type="file" accept="image/*"
                                            onChange={handleFotoChange}
                                        />
                                    </div>

                                    {/* Mostrar RUC */}
                                    {emprendedor?.emprendedorRuc && (
                                        <div className="sm:col-span-3">
                                            <label htmlFor="ruc" className="block text-sm font-medium leading-6 text-black">Ruc</label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("emprendedorRuc", { required: "Este campo es obligatorio" })}
                                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                                    readOnly />
                                                {errors.emprendedorRuc && <p className="text-red-500 text-sm">{errors.emprendedorRuc.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar Dirección */}
                                    {emprendedor?.emprendedorDireccion && (
                                        <div className="sm:col-span-3">
                                            <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-black">Dirección</label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("emprendedorDireccion", { required: "Este campo es obligatorio" })}
                                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                                    readOnly />
                                                {errors.emprendedorDireccion && <p className="text-red-500 text-sm">{errors.emprendedorDireccion.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar Razón Social */}
                                    {emprendedor?.emprendedorRazonSocial && (
                                        <div className="sm:col-span-6">
                                            <label htmlFor="razon-social" className="block text-sm font-medium leading-6 text-black">Razón Social</label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("emprendedorRazonSocial", { required: "Este campo es obligatorio" })}
                                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                                    readOnly />
                                                {errors.emprendedorRazonSocial && <p className="text-red-500 text-sm">{errors.emprendedorRazonSocial.message}</p>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Mostrar Rubro */}
                                    {emprendedor?.rubro?.rubroNombre && (
                                        <div className="col-span-full">
                                            <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-black">Rubro</label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("rubroNombre", { required: "Este campo es obligatorio" })}
                                                    className="block w-full rounded-md border-0 py-1.5 bg-gray-100 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 cursor-not-allowed"
                                                    readOnly />
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
                    <div
                        className="flex flex-col items-center justify-center min-h-screen text-center mx-auto"
                    >
                        <div ref={qrRef} style={{ marginBottom: "20px" }}>
                            <QRCode
                                size={256}
                                value={value}
                                style={{ width: "256px", height: "256px" }}
                            />
                        </div>
                        <button
                            onClick={handleGeneratePDF}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Descargar QR
                        </button>
                    </div>

                </div>

            ) : (
                <p>Cargando...</p>
            )}
        </>
    )
}

export default EmprendedorForm