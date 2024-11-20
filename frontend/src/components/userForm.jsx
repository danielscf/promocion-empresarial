import React from 'react'
import { addNewUsuario, habilitarUsuario } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { getAllRol } from '../api/rolApi';
import { useState, useEffect } from 'react';
import { showSuccessMessage, showErrorMessage } from '../app/utils/messages';

const userForm = ({ closeModal, register, handleSubmit, errors, reset }) => {

    const [roles, setroles] = useState([])
    const dispatch = useDispatch();

    const onSubmit = async (data) => {

        dispatch(addNewUsuario(data)).then((response) => {

            if (response.type === "usuarios/addNewUsuario/fulfilled") {
                dispatch(habilitarUsuario(response.payload.usuarioId))
                showSuccessMessage();
                reset();
                closeModal();
            } else if (response.type === "usuarios/addNewUsuario/rejected") {
                showErrorMessage();
            }
        });
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

            <div className="mb-4">
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioNombre', { required: true })} />
                {errors.usuarioNombre && <span className="text-red-500">El nombre es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
                <input type="text" id="apellidoPaterno" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioApellidoPaterno', { required: true })} />
                {errors.usuarioApellidoPaterno && <span className="text-red-500">El apellido paterno es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioApellidoMaterno', { required: true })} />
                {errors.usuarioApellidoMaterno && <span className="text-red-500">El apellido materno es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioDni', {
                        required: "El Dni es requerido",
                        pattern: {
                            value: /^\d{8}$/,
                            message: "El DNI debe tener 8 dígitos"
                        }
                    })}
                />
                {errors.usuarioDni && <p className="text-red-600 text-sm mt-1">{errors.usuarioDni.message}</p>}
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
                <input type="text" id="telefono" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioTelefono', {
                        required: "El teléfono es requerido",
                        pattern: {
                            value: /^[0-9]{9}$/,
                            message: "El teléfono debe tener 9 dígitos"
                        }
                    })} />
                {errors.usuarioTelefono && <span className="text-red-500">{errors.usuarioTelefono.message}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select id="rol" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500" {...register('rolId', { required: true })}>
                    <option value="">Selecciona un rol</option>
                    {roles.map(rol => (
                        <option key={rol.rolId} value={rol.rolId}>{rol.rolNombre}</option>
                    ))}
                </select>
                {errors.rolId && <span className="text-red-500">El rol es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha Nacimiento</label>
                <input type="date" id="fecha_nacimiento" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioFechaNacimiento', { required: true })} />
                {errors.usuarioFechaNacimiento && <span className="text-red-500">La fecha de nacimiento es requerida</span>}
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
    )
}

export default userForm