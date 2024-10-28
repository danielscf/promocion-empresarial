import React from 'react'
import { createUser } from '../services/userService'
import { getAllRol } from '../services/rolService';
import { useState,useEffect } from 'react';

const userForm = ({ closeModal, register, handleSubmit, errors }) => {

    const [roles, setroles] = useState([])

    const onSubmit = async (data) => {
        try {
            const result = await createUser(data);
            console.log('Usuario creado:', result);

        } catch (error) {
            console.error('Error al crear el usuario:', error);
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
            <div className="mb-4">
                <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700 mb-1">Nombre Usuario</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioUsuario', { required: true })} />
                {errors.nombre && <span className="text-red-500">El nombre es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input type="password" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioContrasena', { required: true })} />
                {errors.nombre && <span className="text-red-500">La contraseña es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioNombre', { required: true })} />
                {errors.nombre && <span className="text-red-500">El nombre es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input type="text" id="apellidoPaterno" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioApellidoPaterno', { required: true })} />
                {errors.apellidos && <span className="text-red-500">Los apellidos son requeridos</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                <input type="text" id="apellidoMaterno" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioApellidoMaterno', { required: true })} />
                {errors.apellidos && <span className="text-red-500">Los apellidos son requeridos</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                <input type="text" id="dni" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioDni', { required: true })} />
                {errors.dni && <span className="text-red-500">El dni es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                <input type="email" id="correo" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioCorreo', { required: true })} />
                {errors.correo && <span className="text-red-500">El correo es requerido</span>}
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
                {errors.telefono && <span className="text-red-500">{errors.telefono.message}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select id="rol" multiple className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500" {...register('rolId', { required: true })}>
                    {roles.map(rol => (
                        <option value={rol.rolId}>{rol.rolNombre}</option>
                    ))}
                </select>
                {errors.rol && <span className="text-red-500">El rol es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha Nacimiento</label>
                <input type="date" id="fecha_nacimiento" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioFechaDeNacimiento', { required: true })} />
                {errors.fecha_nacimiento && <span className="text-red-500">La fecha de nacimiento es requerida</span>}
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