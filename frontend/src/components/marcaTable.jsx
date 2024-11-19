import React, { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMarca, fetchMarcasByEmprendedor } from '../store/marcaSlice';
import { useEmprendedor } from '../context/EmprendedorContext';
import { showConfirmation } from '../app/utils/confirmationDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal';
import MarcaEditForm from './marcaEditForm';

const MarcaTable = () => {
    const dispatch = useDispatch();
    const { emprendedorId } = useEmprendedor();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { marcas, status, error } = useSelector((state) => state.marcas);
    const [marcaId, setmarcaId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Estado para recargar los datos
    const [reload, setReload] = useState(false);

    const validMarcas = useMemo(() => marcas.filter(marca => marca && marca.marcaId), [marcas]);

    useEffect(() => {
        if (emprendedorId) {
            dispatch(fetchMarcasByEmprendedor(emprendedorId));
            setReload(false);
        }
    }, [emprendedorId, dispatch, reload]);

    const handleDelete = async (marcaId) => {
        const confirmed = await showConfirmation();
        if (confirmed) {
            await dispatch(deleteMarca(marcaId));
            setReload(true); // Activar la recarga
        }
    };

    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: row => row?.marcaId || 'Sin ID', 
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row?.marcaNombre || 'Sin Nombre', 
            sortable: true,
        },
        {
            name: 'IMAGEN',
            cell: row => (
                row?.marcaId ? (
                    <img
                        className="my-2"
                        src={`${apiUrl}/marca/${row.marcaId}/foto`}
                        alt="Imagen de Marca"
                        loading="lazy"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                ) : <span>Sin imagen</span>
            ),
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <FontAwesomeIcon className='cursor-pointer h-6 w-6'
                icon={faPenToSquare} 
                onClick={() => {
                    setmarcaId(row.marcaId)
                    openModal()
                }}/>
            ),
            ignoreRowClick: true,
            button: "true",
        },
        {
            name: 'ELIMINAR',
            cell: row => (
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer h-6 w-6"
                    onClick={() => handleDelete(row?.marcaId)}
                />
            ),
            ignoreRowClick: true,
            button: "true",
        },
        
    ], [apiUrl, handleDelete]);

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full border h-screen border-gray-300 rounded-lg shadow-md">
            <DataTable
                title="Lista de Marcas"
                columns={columns}
                data={validMarcas}
                pagination
                className="w-full"
            />
             <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Marca">
                <MarcaEditForm
                    closeModal={closeModal}
                    marcaId={marcaId}
                />
            </Modal>
        </div>
    );
};

export default MarcaTable;
