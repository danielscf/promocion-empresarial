import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUsuario, fetchUsuarios } from '../store/userSlice';
import DataTable from 'react-data-table-component';
import { showConfirmation } from '../app/utils/confirmationDialog';
import Modal from './modal';
import UsuarioEditForm from './usuarioEditForm';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserTable = () => {
    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.usuarios.usuarios);
    const [usuarioId, setusuarioId] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        dispatch(fetchUsuarios());
    }, [dispatch]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = useCallback(async (id) => {
        const confirmed = await showConfirmation();
        if (confirmed) {
            dispatch(deleteUsuario(id));
        }
    }, [dispatch]);

    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: row => row.usuarioId,
            sortable: true,
        },
        {
            name: 'NOMBRE USUARIO',
            selector: row => row.usuarioUsuario,
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
            name: 'ROL',
            selector: row => row.roles?.[0]?.rolNombre,
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <FontAwesomeIcon className="cursor-pointer h-6 w-6 ml-3"
                    icon={faPenToSquare}
                    onClick={() => {
                        openModal()
                        setusuarioId(row.usuarioId)
                    }} />
            ),
            ignoreRowClick: true,
        },
        {
            name: 'ELIMINAR',
            cell: row => (
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer h-6 ml-3 w-6"
                    onClick={() => handleDelete(row.usuarioId)}
                />
            ),
            ignoreRowClick: true,
        }, 
    ],[handleDelete, setusuarioId]);

    const usuariosFiltrados = usuarios?.filter(usuario => usuario?.usuarioEstado !== 3) || [];
    const validData = usuariosFiltrados.filter(item => item && typeof item.usuarioId !== "undefined");
    return (
        <div className="overflow-hidden max-w-full border border-gray-300 rounded-lg shadow-lg">
            <DataTable
                title="Lista de Usuarios"
                columns={columns}
                data={validData}
                pagination
                keyField="usuarioId"
                className="min-w-full"
            />
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Usuario">
                <UsuarioEditForm
                    closeModal={closeModal}
                    usuarioId={usuarioId}
                />
            </Modal>
        </div>
    );
};

export default UserTable;
