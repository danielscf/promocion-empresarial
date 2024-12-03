import React, { useEffect, useState } from 'react'
import { getAllRol } from '@/api/rolApi'
import { findUsuarioById } from '@/api/userApi'
import { useDispatch } from 'react-redux'
import { editUsuario, fetchUsuarios } from '@/store/userSlice'
import { useForm } from 'react-hook-form'
import { showSuccessMessage, showErrorMessage } from '@/app/utils/messages'
import { alertPersonalizado } from '@/app/utils/messages'

const UsuarioEditForm = ({ closeModal, usuarioId }) => {

    const [roles, setroles] = useState([])
    const [usuario, setUsuario] = useState(null)
    const dispatch = useDispatch()

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {

        const cargarRoles = async () => {
            const res = await getAllRol()
            setroles(res.data)
        }

        const cargarDatosUser = async () => {
            const response = await findUsuarioById(usuarioId);
            setUsuario(response.data);
            const usuarioData = response.data;

            setValue('usuarioUsuario', usuarioData.usuarioUsuario);
            setValue('usuarioNombre', usuarioData.usuarioNombre);
            setValue('usuarioApellidoPaterno', usuarioData.usuarioApellidoPaterno);
            setValue('usuarioApellidoMaterno', usuarioData.usuarioApellidoMaterno);
            setValue('usuarioDni', usuarioData.usuarioDni);
            setValue('usuarioCorreo', usuarioData.usuarioCorreo);
            setValue('usuarioTelefono', usuarioData.usuarioTelefono);
            setValue('rolId', usuarioData.roles?.[0]?.rolId);
        };

        cargarRoles()
        cargarDatosUser()

    }, [usuarioId,setValue])

    const onSubmit = async (data) => {

        if (
            (usuario.roles[0].rolNombre === 'Emprendedor' && usuario.roles[0].rolId !== data.rolId) ||
            ((usuario.roles[0].rolNombre === 'Administrador' || usuario.roles[0].rolNombre === 'Operador') && data.rolNombre === 'Emprendedor')
        ) {
            const mensaje =
                usuario.roles[0].rolNombre === 'Emprendedor'
                    ? 'No se puede modificar el rol de un emprendedor.'
                    : 'No se puede modificar el rol de un superUsuario a Emprendedor.';
            alertPersonalizado('Cambio de rol no permitido', mensaje);
            return;
        }

        const datos_usuario = {
            ...data,
            usuarioId: usuario.usuarioId,
            usuarioFechaCreacion: usuario.usuarioFechaCreacion,
            usuarioContrasena: usuario.usuarioContrasena,
            usuarioEstado: usuario.usuarioEstado,
            usuarioFechaNacimiento: usuario.usuarioFechaNacimiento,
            roles: [
                {
                    rolId: data.rolId,
                }
            ]
        };

        dispatch(editUsuario(datos_usuario)).then((response) => {
            console.log(response)
            if (response.type === "usuarios/editUsuario/fulfilled") {
                showSuccessMessage('Editado exitosamente', 'Los datos del usuario se han editado con exito');
                dispatch(fetchUsuarios())
                closeModal()
                reset()
            } else if (response.type === "usuarios/editUsuario/rejected") {
                showErrorMessage('Error en la edicion', 'Hubo un problema en editar los datos del usuario');
                console.log(response)
            }
        })
    };

    if (!usuario || roles.length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700 mb-1">Nombre Usuario</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioUsuario', { required: true })} />
                {errors.usuarioUsuario && <span className="text-red-500">El nombre de usuario es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioNombre', { required: true })} readOnly />
                {errors.usuarioNombre && <span className="text-red-500">El nombre es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
                <input type="text" id="apellidoPaterno" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioApellidoPaterno', { required: true })} readOnly />
                {errors.usuarioApellidoPaterno && <span className="text-red-500">El apellido paterno es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('usuarioApellidoMaterno', { required: true })} readOnly />
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
                    readOnly />
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
                    })} readOnly />
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
                    })} readOnly />
                {errors.usuarioTelefono && <span className="text-red-500">{errors.usuarioTelefono.message}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('rolId', { required: true })}
                    onChange={(e) => {
                        const selectedOption = roles.find(rol => rol.rolId === parseInt(e.target.value));
                        setValue('rolId', e.target.value);
                        setValue('rolNombre', selectedOption ? selectedOption.rolNombre : '');
                    }}
                >
                    <option value="">Selecciona un rol</option>
                    {roles.map((rol) => (
                        <option key={rol.rolId} value={rol.rolId}>
                            {rol.rolNombre}
                        </option>
                    ))}
                </select>
            </div>


            <div className="flex justify-end mt-4">
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2" onClick={closeModal}>
                    Cerrar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Editar
                </button>
            </div>
        </form>
    )
}

export default UsuarioEditForm
