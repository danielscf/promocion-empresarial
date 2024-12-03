import React, { useEffect, useMemo, useState,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductoByEmprendedor } from '../store/productoSlice';
import { useEmprendedor } from '../context/EmprendedorContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DataTable from 'react-data-table-component';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal';
import ProductoEditForm from './productoEditForm';
import { deleteProducto } from '../store/productoSlice';
import { deleteImagen } from '../api/imagenApi';
import { showConfirmation } from '../app/utils/confirmationDialog';
import Image from 'next/image';

const ProductoTable = () => {

    const dispatch = useDispatch();
    const productos = useSelector((state) => state.productos.productos)
    const { emprendedorId } = useEmprendedor();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [reload, setReload] = useState(false);

    const [productoId, setproductoId] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        dispatch(fetchProductoByEmprendedor(emprendedorId))
        setReload(false);

    }, [dispatch, emprendedorId, reload]);


    const handleDelete = useCallback(async (productoId, imagenId) => {
        const confirmed = await showConfirmation();
        if (!confirmed) return;
    
        try {
            if (productoId && imagenId) {
                await deleteImagen(imagenId);
                //console.log(`Imagen con ID ${imagenId} eliminada exitosamente.`);
                await dispatch(deleteProducto(productoId)).unwrap();
                //console.log(`Producto con ID ${productoId} eliminado exitosamente.`);
    
                setReload(true);
            }
        } catch (error) {
            console.error("Error al eliminar el producto o imagen:", error);
        }
    }, [dispatch, setReload]);
    

    const columns = useMemo(() => [
        {
            name: 'ID',
            selector: row => row.productoId,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.productoNombre,
            sortable: true,
        },
        {
            name: 'DESCRIPCION',
            selector: row => row.productoDescripcion,
            sortable: true,
        },
        {
            name: 'IMAGEN',
            cell: row => (
                row?.imagenes && row.imagenes?.[0]?.imagenId ? (
                    <Image
                        className="my-2 w-20 h-20"
                        src={`${apiUrl}/imagen/${row.imagenes[0].imagenId}/foto?timestamp=${new Date().getTime()}`}
                        alt="Imagen de producto"
                        priority={true}
                        width={80}
                        height={80}
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
                        setproductoId(row.productoId);
                        openModal();
                    }} />
            ),
            ignoreRowClick: true,
        },
        {
            name: 'ELIMINAR',
            cell: row => (
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 cursor-pointer h-6 w-6 ml-3"
                    onClick={() => handleDelete(row.productoId, row.imagenes?.[0]?.imagenId || null)}
                />
            ),
            ignoreRowClick: true,
        },
    ], [apiUrl, handleDelete]);
    

    return (
        <div className="overflow-hidden max-w-full border border-gray-300 rounded-lg shadow-md">
            <DataTable
                title="Lista de productos"
                columns={columns}
                data={productos}
                pagination
                className="min-w-full"
            />
            <Modal isOpen={isModalOpen} handleClose={closeModal} title="Editar Producto">
                <ProductoEditForm
                    closeModal={closeModal}
                    productoId={productoId}
                />
            </Modal>
        </div>

    )
}

export default ProductoTable
