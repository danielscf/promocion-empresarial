import React, { useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUsuario, fetchUsuarios } from '../store/userSlice';
import DataTable from 'react-data-table-component';
import { showConfirmation } from '../app/utils/confirmationDialog';

const userTable = () => {

    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.usuarios.usuarios);

    useEffect(() => {
        
        dispatch(fetchUsuarios());

    }, [dispatch]);

    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: row => row.usuarioId,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.usuarioNombre,
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
                    onClick={() => handleDelete(row.usuarioId)}
                />
            ),
            ignoreRowClick: true,
            button: "true",
        },
    ], []); 

    const usuariosFiltrados = usuarios.filter(usuario => usuario.usuarioEstado !== 3);

    const handleDelete = async(id) => {

        const confirmed = await showConfirmation();
        if (confirmed) {
            dispatch(deleteUsuario(id))
        }
    };

    return (
        <div className="overflow-hidden max-w-full border border-gray-300 rounded-lg shadow-md">
            <DataTable
                title="Lista de Usuarios"
                columns={columns}
                data={usuariosFiltrados}
                pagination
                className="min-w-full"
            />
        </div>

    )
}

export default userTable