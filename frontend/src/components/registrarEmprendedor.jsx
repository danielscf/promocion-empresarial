import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { addNewSolicitud } from '../store/solicitudSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRubros } from '../store/rubroSlice';
import { alertPersonalizado, showErrorMessage, showSuccessMessage } from '../app/utils/messages';
import { fetchRucInfo } from '@/api/rucApi';
import { useRouter } from 'next/navigation';

const RegistrarEmprendedor = ({ register, handleSubmit, errors, setValue, reset }) => {

    const dispatch = useDispatch()
    const { rubros } = useSelector((state) => state.rubros)
    const [selectedFile, setSelectedFile] = useState(null);
    const [rucEmprendedor, setrucEmprendedor] = useState(null)
    const [disable, setdisable] = useState(false)
    const [dniError, setDniError] = useState("");
    const [rucError, setRucError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const router = useRouter();

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                showErrorMessage('Archivo no válido', 'Por favor selecciona una imagen en formato JPEG, PNG o GIF.');
                e.target.value = '';
                setSelectedFile(null);
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showErrorMessage('Archivo demasiado grande', 'El archivo debe ser menor a 5 MB.');
                e.target.value = '';
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
        }
    };
    useEffect(() => {

        dispatch(fetchRubros())
       
    }, [dispatch])

    const handleBuscarEmprendedor = async (e) => {
        e.preventDefault();
        if (!/^\d{11}$/.test(rucEmprendedor)) {
            alertPersonalizado("Ruc Invalido", "El RUC debe tener 11 dígitos.");
            return;
        }

        try {
            const response = await fetchRucInfo(rucEmprendedor)
            const datos = response.data

            if (datos) {
                setdisable(true);
                setValue("emprendedorDireccion", datos.direccion)
                setValue("emprendedorRazonSocial", datos.razonSocial)
                setValue("emprendedorEstadoContribuyente", datos.estado)
                setValue("emprendedorCondicionContribuyente", datos.condicion)
                setValue("tipoActividad", datos.actividadEconomica)
                setValue("tipoContribuyente", datos.tipo)

            }
        } catch (error) {
            showErrorMessage(error.message)
        }

    }

    const restringirCantidadDigitos = (e, tipoAtributo) => {
        const digitos = e.target.value.replace(/\D/g, "");
        const limite = tipoAtributo === "dni" ? 8 : tipoAtributo === "ruc" ? 11 : tipoAtributo === "telefono" ? 9 : 0;
        const mensaje = tipoAtributo === "dni" ? "El dni debe tener 8 dígitos" :
            tipoAtributo === "telefono" ? "El teléfono debe tener 9 dígitos" :
                tipoAtributo === "ruc" ? "El ruc debe tener 11 dígitos" : "";

        if (digitos.length > limite) {
            e.target.value = digitos.slice(0, limite);
        }

        if (digitos.length === 11 && tipoAtributo === "ruc" && !["10", "20"].includes(digitos.substring(0, 2))) {
            e.target.value = "";
            if (tipoAtributo === "ruc") {
                setRucError("RUC inválido. Debe comenzar con 10 o 20");
            }
            return;
        }

        if (digitos.length > limite) {
            if (tipoAtributo === "dni") setDniError(mensaje);
            if (tipoAtributo === "telefono") setTelefonoError(mensaje);
            if (tipoAtributo === "ruc") setRucError(mensaje);

            setTimeout(() => {
                if (tipoAtributo === "dni") setDniError("");
                if (tipoAtributo === "telefono") setTelefonoError("");
                if (tipoAtributo === "ruc") setRucError("");
            }, 2000);
        } else {
            if (tipoAtributo === "dni") setDniError("");
            if (tipoAtributo === "telefono") setTelefonoError("");
            if (tipoAtributo === "ruc") setRucError("");
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            const nuevaSolicitud = {
                usuario: {
                    usuarioDni: data.usuarioDni,
                    usuarioUsuario: data.usuarioDni + "temporal",
                    usuarioContrasena: data.usuarioDni + "temporal",
                    usuarioNombre: data.usuarioNombre,
                    usuarioApellidoPaterno: data.usuarioApellidoPaterno,
                    usuarioApellidoMaterno: data.usuarioApellidoMaterno,
                    usuarioCorreo: data.usuarioCorreo,
                    usuarioTelefono: data.usuarioTelefono,
                    usuarioFechaNacimiento: data.usuarioFechaNacimiento,
                },
                emprendedor: {
                    emprendedorRuc: data.emprendedorRuc,
                    emprendedorDireccion: data.emprendedorDireccion,
                    emprendedorRazonSocial: data.emprendedorRazonSocial,
                    emprendedorEstadoContribuyente: data.emprendedorCondicionContribuyente,
                    emprendedorCondicionContribuyente: data.emprendedorCondicionContribuyente,
                    tipoContribuyente: data.tipoContribuyente,
                    tipoActividad: data.tipoActividad,
                    rubro: {
                        rubroId: data.rubroId,
                        rubroNombre: data.rubroNombre,
                    },
                },
            };

            formData.append("nuevaSolicitud", JSON.stringify(nuevaSolicitud));

            if (selectedFile) {
                formData.append("foto", selectedFile);
            } else {
                throw new Error("No se seleccionó una foto.");
            }

            formData.append("emprendedorRuc", data.emprendedorRuc);

            dispatch(
                addNewSolicitud({
                    nuevoSolicitud: nuevaSolicitud,
                    selectedFile: selectedFile,
                    emprendedorRuc: data.emprendedorRuc,
                })
            ).then((response) => {
                if (response.type === "solicitudes/addNewSolicitud/fulfilled") {
                    showSuccessMessage("Registro exitoso", "El registro se ha realizado con éxito");
                    setdisable(false)
                    reset();
                } else if (response.type === "solicitudes/addNewSolicitud/rejected") {
                    const backendMessage = response?.payload?.message || "Hubo un problema al realizar el registro.";
                    showErrorMessage("Error en el registro", backendMessage);
                }
            });
        } catch (error) {
            console.error("Error al registrar solicitud:", error);

            if (error.response) {
                const backendMessage = error.response.data?.message || error.response.statusText || "Error desconocido en el servidor.";
                showErrorMessage("Error del servidor", backendMessage);
            } else if (error.request) {
                showErrorMessage(
                    "Error de red",
                    `No se pudo conectar con el servidor. Por favor, revisa tu conexión a Internet y vuelve a intentarlo. Detalles: ${error.message}`
                );
            } else {
                showErrorMessage("Error desconocido", `Hubo un error desconocido: ${error.message}. Intenta de nuevo más tarde.`);
            }
        }
    };

    return (
        <div className="bg-white p-8 w-full rounded-md shadow-md">
            <div className="flex justify-start mb-4">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Regresar
                </button>
            </div>
            <h2 className="text-center text-2xl text-black font-bold mb-6">Registro de Emprendedor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b w-full border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-x-6 gap-y-8">

                            {/* Datos de Usuario */}
                            <h3 className="text-xl font-bold mb-4 text-black col-span-6 md:col-span-3">Datos de Usuario</h3>

                            <div className="col-span-6 md:col-span-6 lg:col-span-6">
                                <input type="text" placeholder='Ingresar dni'
                                    className="w-full p-2 rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioDni', { required: true })}
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");
                                    }}
                                    onChange={(e) => restringirCantidadDigitos(e, 'dni')} />
                                {errors.usuarioDni && <span className="text-red-500">El dni es requerido</span>}
                                {dniError && <span className="text-red-500 text-sm mt-1">{dniError}</span>}
                            </div>

                            {/* Nombres */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-black">
                                    Nombres
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-black shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioNombre', { required: true })} />
                                {errors.usuarioNombre && <span className="text-red-500">El nombre es requerido</span>}
                            </div>

                            {/* Apellido Paterno */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="apellido-paterno" className="block text-sm font-medium leading-6 text-black">
                                    Apellido Paterno
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-black shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioApellidoPaterno', { required: true })} />
                                {errors.usuarioApellidoPaterno && <span className="text-red-500">El apellido paterno es requerido</span>}
                            </div>

                            {/* Apellido Materno */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="apellido-materno" className="block text-sm font-medium leading-6 text-black">
                                    Apellido Materno
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-black shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioApellidoMaterno', { required: true })} />
                                {errors.usuarioApellidoMaterno && <span className="text-red-500">El apellido materno es requerido</span>}
                            </div>

                            {/* Teléfono */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-black">
                                    Teléfono
                                </label>
                                <input type="tel" className="block w-full rounded-md border-0 p-2 text-black shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioTelefono', {
                                        required: "El teléfono es requerido",
                                        pattern: {
                                            value: /^[0-9]{9}$/,
                                            message: "El teléfono debe tener 9 dígitos"
                                        }
                                    })}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, "")}}
                                    onChange={(e) => restringirCantidadDigitos(e, 'telefono')}
                                />
                                {errors.usuarioTelefono && (
                                    <p className="text-red-600 text-sm mt-1">{errors.usuarioTelefono.message}</p>
                                )}
                                {telefonoError && <span className="text-red-500 text-sm mt-1">{telefonoError}</span>}
                            </div>

                            {/* Correo */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="correo" className="block text-sm font-medium leading-6 text-black">
                                    Correo
                                </label>
                                <input type="email" className="block w-full rounded-md border-0 p-2 text-black shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioCorreo', { required: true })} />
                                {errors.usuarioCorreo && <span className="text-red-500">El correo es requerido</span>}
                            </div>

                            {/* Fecha de nacimiento */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium leading-6 text-black">
                                    Fecha de nacimiento
                                </label>
                                <input type="date" className="block w-full rounded-md border-0 p-2 text-black shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioFechaNacimiento', { required: true })} />
                                {errors.usuarioFechaNacimiento && <span className="text-red-500">La fecha de nacimiento es requerida</span>}
                            </div>

                            {/* Datos de Emprendedor */}
                            <h3 className="text-xl font-bold mb-4 col-span-6">Datos de Emprendedor</h3>

                            <div className="flex md:flex-row justify-center items-center col-span-6">
                                <input type="text" placeholder="Ingresar ruc" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                focus:ring focus:ring-indigo-500`} readOnly={disable} {...register('emprendedorRuc', {required: 'El RUC es requerido',})}
                                    onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, "");}}
                                    onChange={(e) => {restringirCantidadDigitos(e, 'ruc');setrucEmprendedor(e.target.value)}}
                                />
                                <button className="p-2 ml-1 bg-black text-white rounded-md" onClick={handleBuscarEmprendedor}>
                                    <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                                </button>
                            </div>
                            <div className="flex md:flex-row justify-center items-center col-span-6">
                                {(errors.emprendedorRuc || rucError) && (
                                    <span className="text-red-500 text-sm mt-1">
                                        {errors.emprendedorRuc ? errors.emprendedorRuc.message : rucError}
                                    </span>
                                )}
                            </div>
                            {/* Dirección */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-black">
                                    Dirección
                                </label>
                                <input type="text"
                                    className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                focus:ring focus:ring-indigo-500`} readOnly={disable} {...register('emprendedorDireccion', { required: true })} />
                                {errors.emprendedorDireccion && <span className="text-red-500">La direccion es requerida</span>}
                            </div>

                            {/* Razon Social */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="razon_social" className="block text-sm font-medium leading-6 text-black">
                                    Razón Social
                                </label>
                                <input type="text"
                                    className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                 focus:ring focus:ring-indigo-500`} readOnly={disable} {...register('emprendedorRazonSocial', { required: true })} />
                                {errors.emprendedorRazonSocial && <span className="text-red-500">La razon social es requerida</span>}
                            </div>

                            {/* Estado Contribuyente */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="estadoContribuyente" className="block text-sm font-medium leading-6 text-black">
                                    Estado Contribuyente
                                </label>
                                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                 focus:ring focus:ring-indigo-500`} readOnly={disable} {...register('emprendedorEstadoContribuyente', { required: true })} />
                                {errors.emprendedorEstadoContribuyente && <span className="text-red-500">El estado contribuyente es requerido</span>}
                            </div>

                            {/* Condición Contribuyente */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="condicionContribuyente" className="block text-sm font-medium leading-6 text-black">
                                    Condición Contribuyente
                                </label>
                                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                 focus:ring focus:ring-indigo-500`} readOnly={disable} {...register('emprendedorCondicionContribuyente', { required: true })} />
                                {errors.emprendedorCondicionContribuyente && <span className="text-red-500">La condicion contribuyente es requerida</span>}
                            </div>

                            {/* Rubro */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-black">
                                    Rubro
                                </label>
                                <select
                                    className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    {...register('rubroId', { required: true })}
                                    onChange={(e) => {
                                        const selectedOption = rubros.find(rubro => rubro.rubroId === parseInt(e.target.value));
                                        setValue('rubroId', e.target.value);
                                        setValue('rubroNombre', selectedOption ? selectedOption.rubroNombre : '');
                                    }}
                                >
                                    <option value="">Selecciona un rubro</option>
                                    {rubros.map(rubro => (
                                        <option key={rubro.rubroId} value={rubro.rubroId}>
                                            {rubro.rubroNombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.rubroId && <span className="text-red-500">El rubro es requerido</span>}
                            </div>

                            {/* Tipo Contribuyente */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="tipoContribuyente" className="block text-sm font-medium leading-6 text-black ">
                                    Tipo contribuyente
                                </label>
                                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                 focus:ring focus:ring-indigo-500`} readOnly={disable}
                                    {...register('tipoContribuyente', { required: true })} />
                                {errors.tipoContribuyente && <span className="text-red-500">El tipo contribuyente es requerido</span>}
                            </div>

                            {/* Tipo Actividad */}
                            <div className="col-span-6 md:col-span-6 lg:col-span-6">
                                <label htmlFor="tipoActividad" className="block text-sm font-medium leading-6 text-black">
                                    Tipo actividad
                                </label>
                                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full text-black p-2 focus:outline-none 
                                 focus:ring focus:ring-indigo-500`} readOnly={disable}
                                    {...register('tipoActividad', { required: true })} />
                                {errors.tipoActividad && <span className="text-red-500">El tipo de actividad es requerido</span>}
                            </div>

                            {/* Foto del Emprendedor */}
                            <div className="col-span-6 md:col-span-6 lg:col-span-6">
                                <label htmlFor="foto" className="block text-sm font-medium leading-6 text-black">
                                    Foto del emprendedor
                                </label>
                                <input type="file" accept="image/*" required className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 
                                  file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                                    onChange={handleFileChange}
                                />
                                {errors.emprendedorFoto && <span className="text-red-500">La foto es requerida</span>}
                            </div>

                            <div className="mt-6 flex justify-end col-span-6">
                                <button type="submit" className="rounded-md w-full bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegistrarEmprendedor