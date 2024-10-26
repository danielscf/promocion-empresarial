import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllUsuarios } from '../services/userService';

const userTable = ({ users }) => {

    const [usuarios, setusuarios] = useState([])

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">NOMBRE</th>
                        <th className="px-4 py-2 border">APELLIDOS</th>
                        <th className="px-4 py-2 border">DNI</th>
                        <th className="px-4 py-2 border">CORREO</th>
                        <th className="px-4 py-2 border">TELEFONO</th>
                        <th className="px-4 py-2 border text-center">ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border">{user.id}</td>
                            <td className="px-4 py-2 border">{user.nombre}</td>
                            <td className="px-4 py-2 border">{user.apellidos}</td>
                            <td className="px-4 py-2 border">{user.dni}</td>
                            <td className="px-4 py-2 border">{user.correo}</td>
                            <td className="px-4 py-2 border">{user.telefono}</td>
                            <td className="px-4 py-2 border text-center">
                                <FontAwesomeIcon icon={faTrash} className="text-red-600 h-6 w-6" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default userTable