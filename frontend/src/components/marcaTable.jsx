import React, { useEffect,useCallback, useMemo, useState } from 'react';
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
import Image from 'next/image';

const MarcaTable = () => {
    const dispatch = useDispatch();
    const { emprendedorId } = useEmprendedor();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { marcas, status, error } = useSelector((state) => state.marcas);
    const [marcaId, setmarcaId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (emprendedorId) {
            dispatch(fetchMarcasByEmprendedor(emprendedorId));
        }
    }, [emprendedorId, dispatch]);

    const handleDelete = useCallback(async (marcaId) => {
        const confirmed = await showConfirmation();
        if (confirmed) {
            dispatch(deleteMarca(marcaId));
           emprendedorId && dispatch(fetchMarcasByEmprendedor(emprendedorId));
        }
    }, [dispatch,emprendedorId]);

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
                    <Image
                        className="my-2"
                        src={`${apiUrl}/marca/${row.marcaId}/foto?timestamp=${new Date().getTime()}`}
                        alt="Imagen de Marca"
                        priority={true}
                        width={80}
                        height={80}
                        style={{ width: '80px', height: '80px'}}
                    />
                ) : <span>Sin imagen</span>
            ),
            sortable: true,
        },
        {
            name: 'EDITAR',
            cell: row => (
                <FontAwesomeIcon className='cursor-pointer h-6 w-6 ml-3'
                icon={faPenToSquare} 
                onClick={() => {
                    setmarcaId(row.marcaId)
                    openModal()
                }}/>
            ),
            ignoreRowClick: true,
        },
        {
            name: 'ELIMINAR',
            cell: row => (
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer h-6 w-6 ml-3"
                    onClick={() => handleDelete(row?.marcaId)}
                />
            ),
            ignoreRowClick: true,
        },
        
    ], [handleDelete,apiUrl]);

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const marcasFiltradas = marcas?.filter(marca => marca?.marcaEstado === 0 )

    return (
        <div className="overflow-hidden max-w-full border border-gray-300 rounded-lg shadow-md">
            <DataTable
                title="Lista de Marcas"
                columns={columns}
                data={marcasFiltradas}
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
