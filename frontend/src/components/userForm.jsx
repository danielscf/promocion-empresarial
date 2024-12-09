import React from 'react'
import { addNewUsuario, habilitarUsuario } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { getAllRol } from '../api/rolApi';
import { useState, useEffect } from 'react';
import { showSuccessMessage, showErrorMessage, alertPersonalizado } from '../app/utils/messages';
import { fetchDniInfo } from '@/api/dniApi';


const UserForm = ({ closeModal, register, handleSubmit, errors, reset, setValue }) => {

    const [roles, setroles] = useState([])
    const dispatch = useDispatch();
    const [busqueda, setbusqueda] = useState(null)
    const [disable, setdisable] = useState(false)
    const [dniError, setDniError] = useState("");
    const [telefonoError, setTelefonoError] = useState("");

    const handleBuscar = async (e) => {
        e.preventDefault();
        console.log(busqueda);
        if (!/^\d{8}$/.test(busqueda)) {
            alertPersonalizado('', 'El DNI debe tener 8 dígitos.');
            return;
        }
        try {
            const response = await fetchDniInfo(busqueda);
            const datos = response.data;
            // console.log('Datos obtenidos:', datos);
            if (datos) {
                setdisable(true);
                setValue("usuarioNombre", datos.nombres);
                setValue("usuarioApellidoPaterno", datos.apellidoPaterno);
                setValue("usuarioApellidoMaterno", datos.apellidoMaterno);
            }
        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 404) {
                    showErrorMessage('Error', 'El DNI ingresado no existe en la base de datos.');
                } else if (status === 500) {
                    showErrorMessage('Error', 'Error interno del servidor. Inténtelo más tarde.');
                } else {
                    showErrorMessage('Error', 'Ocurrió un error al procesar la solicitud.');
                }
            } else if (error.request) {
                showErrorMessage('Error', 'No se pudo conectar con el servidor. Verifique su conexión a internet.');
            } else {
                showErrorMessage('Error', 'Ocurrió un error desconocido. Inténtelo de nuevo.');
            }
        }

    };

    const onSubmit = async (data) => {

        dispatch(addNewUsuario(data)).then((response) => {

            if (response.type === "usuarios/addNewUsuario/fulfilled") {
                dispatch(habilitarUsuario(response.payload.usuarioId))
                showSuccessMessage();
                reset();
                setdisable(false)
                closeModal();
            } else if (response.type === "usuarios/addNewUsuario/rejected") {
                showErrorMessage();
            }
        });
    };

    const restringirCantidadDigitos = (e, tipoAtributo) => {
        const digitos = e.target.value.replace(/\D/g, "");
        const limite = tipoAtributo === 'dni' ? 8 : 9;
        const mensaje = tipoAtributo === 'dni' ? 'El dni debe tener 8 dígitos' : 'El teléfono debe tener 9 dígitos';

        if (digitos.length > limite) {
            e.target.value = digitos.slice(0, limite);
        }
        if (digitos.length > limite) {
            if (tipoAtributo === "dni") setDniError(mensaje);
            if (tipoAtributo === "telefono") setTelefonoError(mensaje);
            setTimeout(() => {
                if (tipoAtributo === "dni") setDniError("");
                if (tipoAtributo === "telefono") setTelefonoError("");
            }, 2000);
        } else {
            if (tipoAtributo === "dni") setDniError("");
            if (tipoAtributo === "telefono") setTelefonoError("");
        }
    };


    useEffect(() => {

        const cargarRoles = async () => {
            const res = await getAllRol()
            setroles(res.data)

        }
        cargarRoles()

    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 w-full flex items-center">
                <input
                    type="text"
                    className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500`}
                    readOnly={disable}
                    placeholder="Ingresa el DNI"
                    {...register("usuarioDni", {
                        required: "El DNI es requerido",
                    })}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    onChange={(e) => {
                        restringirCantidadDigitos(e, 'dni');
                        setbusqueda(e.target.value);
                    }}
                />
                <button
                    type="button"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mx-2"
                    onClick={handleBuscar}
                >
                    Buscar
                </button>
                <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => {
                        reset()
                        setdisable(false)
                    }}
                >
                    Limpiar
                </button>
            </div>
            <div className="mb-4">
                {errors.usuarioDni && <p className="text-red-600 text-sm mt-1">{errors.usuarioDni.message}</p>}
                {dniError && <span className="text-red-500 text-sm mt-1">{dniError}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500`}
                    {...register('usuarioNombre', { required: true })} readOnly={disable} />
                {errors.usuarioNombre && <span className="text-red-500">El nombre es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500`}
                    {...register('usuarioApellidoPaterno', { required: true })} readOnly={disable} />
                {errors.usuarioApellidoPaterno && <span className="text-red-500">El apellido paterno es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                <input type="text" className={`${disable ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500`}
                    {...register('usuarioApellidoMaterno', { required: true })} readOnly={disable} />
                {errors.usuarioApellidoMaterno && <span className="text-red-500">El apellido materno es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                <input type="email" id="correo" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioCorreo', {
                        required: "El correo es requerido",
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Formato de correo inválido"
                        }
                    })} />
                {errors.usuarioCorreo && <p className="text-red-600 text-sm mt-1">{errors.usuarioCorreo.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    type="tel"
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioTelefono', {
                        required: "El teléfono es requerido",
                        pattern: {
                            value: /^[0-9]{9}$/,
                            message: "El teléfono debe tener 9 dígitos"
                        }
                    })}
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                    onChange={(e) => {
                        restringirCantidadDigitos(e, 'telefono');
                    }}
                />
                {errors.usuarioTelefono && <span className="text-red-500">{errors.usuarioTelefono.message}</span>}
                {telefonoError && <span className="text-red-500 text-sm mt-1">{telefonoError}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select id="rol" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500" {...register('rolId', { required: true })}>
                    <option value="">Selecciona un rol</option>
                    {roles.filter(rol => rol.rolNombre !== 'Emprendedor').map(rol => (
                        <option key={rol.rolId} value={rol.rolId}>{rol.rolNombre}</option>
                    ))}
                </select>
                {errors.rolId && <span className="text-red-500">El rol es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha Nacimiento</label>
                <input type="date" className='border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500'
                    {...register('usuarioFechaNacimiento', { required: true })} />
                {errors.usuarioFechaNacimiento && <span className="text-red-500">La fecha de nacimiento es requerida</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700 mb-1">Nombre Usuario</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioUsuario', { required: true })} />
                {errors.usuarioUsuario && <span className="text-red-500">El nombre de usuario es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input type="password" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioContrasena', { required: true })} />
                {errors.usuarioContrasena && <span className="text-red-500">La contraseña es requerido</span>}
            </div>

            <div className="flex justify-end mt-4">
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    onClick={() => {
                        closeModal()
                        reset()
                    }}>
                    Cerrar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Registrar
                </button>
            </div>
        </form>
    )
}

export default UserForm