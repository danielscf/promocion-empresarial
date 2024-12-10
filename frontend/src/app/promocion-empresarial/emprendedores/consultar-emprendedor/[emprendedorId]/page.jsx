'use client';

import { findEmprendedorById } from '@/api/emprendedorApi';
import { getAllProductosByEmprendedor } from '@/api/productoApi';
import ProductoList from '@/components/productoList';
import Pagination from '@/components/pagination';
import React, { useState, useEffect } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const Page = ({ params }) => {

    const [emprendedor, setEmprendedor] = useState(null);
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter()


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        const cargarDatosEmprendedor = async () => {
            const response = await findEmprendedorById(params.emprendedorId);
            setEmprendedor(response.data);
        };
        cargarDatosEmprendedor();

        const cargarProductos = async () => {
            const response = await getAllProductosByEmprendedor(params.emprendedorId);
            setProductos(response.data);
        };
        cargarProductos();
    }, [params.emprendedorId]);

    const productosFiltrados = productos.filter(producto => producto.productoEstado !== 3)

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProductos = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);


    return (
        <div className="mx-auto p-6 bg-gray-100">
            {emprendedor ? (
                <>
                    <div className="flex justify-start mb-4">
                        <button
                            onClick={() => router.push('/promocion-empresarial/emprendedores/consultar-emprendedor')}
                            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                            Regresar
                        </button>
                    </div>
                    <h2 className="mb-6 text-center text-2xl text-black font-bold">Datos del Emprendedor</h2>
                    <div className="flex flex-col items-center justify-center space-y-6 mb-3 md:space-y-0 md:space-x-6">
                        <Image
                            className="h-44 w-44 mb-4 rounded-full shadow-md"
                            src={`${process.env.NEXT_PUBLIC_API_URL}/emprendedor/${emprendedor.emprendedorId}/foto`}
                            alt="Foto del emprendedor"
                            width={120}
                            height={150} 
                        />
                        <div className="w-full max-w-sm rounded-lg border text-black bg-white p-4 shadow-md">
                            <p className="mb-2 text-lg"><strong>Nombre: </strong>{emprendedor.usuario.usuarioNombre}</p>
                            <p className="mb-2 text-lg"><strong>Apellidos: </strong>{emprendedor.usuario.usuarioApellidoMaterno} {emprendedor.usuario.usuarioApellidoPaterno}</p>
                            <p className="mb-2 text-lg"><strong>RUC: </strong>{emprendedor.emprendedorRuc}</p>
                            <p className="mb-2 text-lg"><strong>Razón Social: </strong>{emprendedor.emprendedorRazonSocial}</p>
                            <p className="text-lg"><strong>Rubro: </strong>{emprendedor.rubro.rubroNombre}</p>
                        </div>
                    </div>

                    <h2 className='text-xl my-6 text-black text-center'>Lista de Productos</h2>

                    <ProductoList productos={currentProductos} showCheckbox={true} />
                    
                    {productos.length > 0 ? (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                            onPageChange={handlePageChange}
                        />
                    ) : (
                        <p className='text-center text-black'>Ningun producto por mostrar</p>
                    )}
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Page;

