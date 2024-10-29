import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsuarios } from '../store/userSlice';
import DataTable from 'react-data-table-component';

const userTable = () => {

    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.usuarios.usuarios);

    useEffect(() => {

        dispatch(fetchUsuarios());

    }, [dispatch]);

    const columns = [
        {
            name: 'ID',
            selector: row => row.usuarioId,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.usuarioUsuario,
            sortable: true,
        },
        {
            name: 'APELLIDOS',
            selector: row => `${row.usuarioApellidoPaterno} ${row.usuarioApellidoMaterno}`,
            sortable: true,
        },
        {
            name: 'DNI',
            selector: row => row.usuarioDni,
            sortable: true,
        },
        {
            name: 'CORREO',
            selector: row => row.usuarioCorreo,
            sortable: true,
        },
        {
            name: 'TELEFONO',
            selector: row => row.usuarioTelefono,
            sortable: true,
        },
        {
            name: 'ELIMINAR',
            cell: row => (
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer h-6 w-6"
                    onClick={() => handleDelete(row.usuarioId)} // Implementa la lógica de eliminación aquí
                />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const handleDelete = (id) => {

        console.log("Eliminar usuario con ID:", id);
    };

    return (
        <div className="overflow-hidden max-w-full border border-gray-300 rounded-lg shadow-md">
            <DataTable
                title="Lista de Usuarios"
                columns={columns}
                data={usuarios}
                pagination
                className="min-w-full"
            />
        </div>

    )
}

export default userTable