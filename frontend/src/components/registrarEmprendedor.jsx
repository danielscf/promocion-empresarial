import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { addNewSolicitud } from '../store/solicitudSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRubros } from '../store/rubroSlice';
import { fetchTipoContribuyente } from '../store/tipoContribuyenteSlice';
import { fetchTipoActividad } from '../store/tipoActividadSlice';
import { showErrorMessage, showSuccessMessage } from '../app/utils/messages';

const registrarEmprendedor = ({ register, handleSubmit, errors, setValue, reset }) => {

    const dispatch = useDispatch()
    const { rubros } = useSelector((state) => state.rubros)
    const { tipoContribuyentes } = useSelector((state) => state.tipoContribuyentes)
    const { tipoActividad } = useSelector((state) => state.tipoActividad)
    const [dni, setdni] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };
    useEffect(() => {

        dispatch(fetchRubros())
        dispatch(fetchTipoContribuyente())
        dispatch(fetchTipoActividad())
        console.log(dni)

    }, [dispatch])
    useEffect(() => {
        console.log(dni)
    }, [dni])

    const onSubmit = async (data) => {
        try {

            const formData = new FormData();

            const nuevaSolicitud = {
                usuario: {
                    "usuarioDni": data.usuarioDni,
                    "usuarioUsuario": data.usuarioUsuario,
                    "usuarioContrasena": data.usuarioContrasena,
                    "usuarioNombre": data.usuarioNombre,
                    "usuarioApellidoPaterno": data.usuarioApellidoPaterno,
                    "usuarioApellidoMaterno": data.usuarioApellidoMaterno,
                    "usuarioCorreo": data.usuarioCorreo,
                    "usuarioTelefono": data.usuarioTelefono,
                    "usuarioFechaNacimiento": data.usuarioFechaNacimiento
                },
                emprendedor: {
                    "emprendedorRuc": data.emprendedorRuc,
                    "emprendedorDireccion": data.emprendedorDireccion,
                    "emprendedorRazonSocial": data.emprendedorRazonSocial,
                    "emprendedorEstadoContribuyente": 0,
                    "emprendedorCondicionContribuyente": 0,
                    "rubro": {
                        "rubroId": data.rubroId,
                        "rubroNombre": data.rubroNombre
                    },
                    "tipoContribuyente": {
                        "tipoContribuyenteId": data.tipoContribuyenteId,
                        "tipoContribuyenteNombre": data.tipoContribuyenteNombre
                    },
                    "tipoActividad": {
                        "tipoActividadId": data.tipoActividadId,
                        "tipoActividadNombre": data.tipoActividadNombre
                    }
                }
            };

            formData.append('nuevaSolicitud', JSON.stringify(nuevaSolicitud));

            if (selectedFile) {
                formData.append('foto', selectedFile);
            } else {
                throw new Error('No se seleccionó una foto.');
            }

            formData.append('emprendedorRuc', data.emprendedorRuc);

            dispatch(addNewSolicitud({ nuevoSolicitud: nuevaSolicitud, selectedFile: selectedFile, emprendedorRuc: data.emprendedorRuc })).then((response) => {
                if (response.type === 'solicitudes/addNewSolicitud/fulfilled') {
                    showSuccessMessage('Registro exitoso', 'La registro se ha realizado con exito')
                    reset()
                } else if (response.type === 'solicitudes/addNewSolicitud/rejected') {
                    showErrorMessage('Error en el registro', 'Hubo un problema en realizar el registro')
                }
            });

        } catch (error) {
            console.error('Error al registrar solicitud:', error);

            if (error.response) {
                showErrorMessage(
                    'Error del servidor',
                    `Hubo un error al procesar tu solicitud. Detalles: ${error.response.data.message || error.response.statusText}`
                );
            } else if (error.request) {

                showErrorMessage(
                    'Error de red',
                    `No se pudo conectar con el servidor. Por favor, revisa tu conexión a Internet y vuelve a intentarlo. Detalles: ${error.message}`
                );
            } else {

                showErrorMessage(
                    'Error desconocido',
                    `Hubo un error desconocido: ${error.message}. Intenta de nuevo más tarde.`
                );
            }
        }
    };

    return (
        <div>
            <h2 className="text-center text-2xl font-bold mb-6">Registro de Emprendedor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b w-full border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-x-6 gap-y-8">

                            {/* Datos de Usuario */}
                            <h3 className="text-xl font-bold mb-4 col-span-6 md:col-span-3">Datos de Usuario</h3>

                            <div className="flex md:flex-row justify-center items-center col-span-6">
                                <input type="text" placeholder='Ingresar dni'
                                    className="w-full p-2 md:w-64 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioDni', { required: true })}
                                    onChange={e => setdni(e.target.value)} />
                                {errors.usuarioDni && <span className="text-red-500">El dni es requerido</span>}
                                <button className="p-2 ml-1 bg-black text-white rounded-md">
                                    <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                                </button>
                            </div>

                            {/* Nombre de Usuario */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="nombre_usuario" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombre de Usuario
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioUsuario', { required: true })} />
                                {errors.usuarioUsuario && <span className="text-red-500">El nombre de usuario es requerido</span>}
                            </div>

                            {/* Contraseña */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="contrasena" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <input type="password" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset
                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioContrasena', { required: true })} />
                                {errors.usuarioContrasena && <span className="text-red-500">La contraseña es requerida</span>}
                            </div>

                            {/* Nombres */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nombres
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioNombre', { required: true })} />
                                {errors.usuarioNombre && <span className="text-red-500">El nombre es requerido</span>}
                            </div>

                            {/* Apellido Paterno */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="apellido-paterno" className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido Paterno
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioApellidoPaterno', { required: true })} />
                                {errors.usuarioApellidoPaterno && <span className="text-red-500">El apellido paterno es requerido</span>}
                            </div>

                            {/* Apellido Materno */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="apellido-materno" className="block text-sm font-medium leading-6 text-gray-900">
                                    Apellido Materno
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioApellidoMaterno', { required: true })} />
                                {errors.usuarioApellidoMaterno && <span className="text-red-500">El apellido materno es requerido</span>}
                            </div>

                            {/* Teléfono */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                                    Teléfono
                                </label>
                                <input type="tel" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioTelefono', {
                                        required: "El teléfono es requerido",
                                        pattern: {
                                            value: /^[0-9]{9}$/,
                                            message: "El teléfono debe tener 9 dígitos"
                                        }
                                    })} />
                                {errors.usuarioTelefono && (
                                    <p className="text-red-600 text-sm mt-1">{errors.usuarioTelefono.message}</p>
                                )}
                            </div>

                            {/* Correo */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="correo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Correo
                                </label>
                                <input type="email" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm 
                                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioCorreo', { required: true })} />
                                {errors.usuarioCorreo && <span className="text-red-500">El correo es requerido</span>}
                            </div>

                            {/* Fecha de nacimiento */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium leading-6 text-gray-900">
                                    Fecha de nacimiento
                                </label>
                                <input type="date" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('usuarioFechaNacimiento', { required: true })} />
                                {errors.usuarioFechaNacimiento && <span className="text-red-500">La fecha de nacimiento es requerida</span>}
                            </div>

                            {/* Datos de Emprendedor */}
                            <h3 className="text-xl font-bold mb-4 col-span-6">Datos de Emprendedor</h3>

                            <div className="flex md:flex-row justify-center items-center col-span-6">
                                <input type="text" placeholder='Ingresar ruc' className="w-full md:w-64 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('emprendedorRuc', { required: true })} />
                                {errors.emprendedorRuc && <span className="text-red-500">EL ruc es requerido</span>}
                                <button className="p-2 ml-1 bg-black text-white rounded-md">
                                    <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                                </button>
                            </div>

                            {/* Dirección */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Dirección
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('emprendedorDireccion', { required: true })} />
                                {errors.emprendedorDireccion && <span className="text-red-500">La direccion es requerida</span>}
                            </div>

                            {/* Razon Social */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="razon_social" className="block text-sm font-medium leading-6 text-gray-900">
                                    Razón Social
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('emprendedorRazonSocial', { required: true })} />
                                {errors.emprendedorRazonSocial && <span className="text-red-500">La razon social es requerida</span>}
                            </div>

                            {/* Estado Contribuyente */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="estadoContribuyente" className="block text-sm font-medium leading-6 text-gray-900">
                                    Estado Contribuyente
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 
                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('emprendedorEstadoContribuyente', { required: true })} />
                                {errors.emprendedorEstadoContribuyente && <span className="text-red-500">El estado contribuyente es requerido</span>}
                            </div>

                            {/* Condición Contribuyente */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="condicionContribuyente" className="block text-sm font-medium leading-6 text-gray-900">
                                    Condición Contribuyente
                                </label>
                                <input type="text" className="block w-full rounded-md border-0 p-2 text-gray-900 
                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    {...register('emprendedorCondicionContribuyente', { required: true })} />
                                {errors.emprendedorCondicionContribuyente && <span className="text-red-500">La condicion contribuyente es requerida</span>}
                            </div>

                            {/* Rubro */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rubro
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                <label htmlFor="tipoContribuyente" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tipo contribuyente
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    {...register('tipoContribuyenteId', { required: true })}
                                    onChange={(e) => {
                                        const selectedOption = tipoContribuyentes.find(tipo => tipo.tipoContribuyenteId === parseInt(e.target.value));
                                        setValue('tipoContribuyenteId', e.target.value);
                                        setValue('tipoContribuyenteNombre', selectedOption ? selectedOption.tipoContribuyenteNombre : '');
                                    }}
                                >
                                    <option value="">Selecciona un tipo de contribuyente</option>
                                    {tipoContribuyentes.map(tipoContribuyente => (
                                        <option key={tipoContribuyente.tipoContribuyenteId} value={tipoContribuyente.tipoContribuyenteId}>
                                            {tipoContribuyente.tipoContribuyenteNombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.tipoContribuyenteId && <span className="text-red-500">El tipo contribuyente es requerido</span>}
                            </div>

                            {/* Tipo Actividad */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="tipoActividad" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tipo actividad
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    {...register('tipoActividadId', { required: true })}
                                    onChange={(e) => {
                                        const selectedOption = tipoActividad.find(tipo => tipo.tipoActividadId === parseInt(e.target.value));
                                        setValue('tipoActividadId', e.target.value);
                                        setValue('tipoActividadNombre', selectedOption ? selectedOption.tipoActividadNombre : '');
                                    }}
                                >
                                    <option value="">Selecciona un tipo de actividad</option>
                                    {tipoActividad.map(tipoActiv => (
                                        <option key={tipoActiv.tipoActividadId} value={tipoActiv.tipoActividadId}>
                                            {tipoActiv.tipoActividadNombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.tipoActividadId && <span className="text-red-500">El tipo de actividad es requerido</span>}
                            </div>

                            {/* Foto del Emprendedor */}
                            <div className="col-span-6 md:col-span-3 lg:col-span-3">
                                <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                                    Foto del emprendedor
                                </label>
                                <input type="file" accept="image/*" className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  
                                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

export default registrarEmprendedor