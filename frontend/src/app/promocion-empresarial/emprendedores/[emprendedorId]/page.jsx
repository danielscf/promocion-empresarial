'use client';

import { findEmprendedorById } from '@/src/api/emprendedorApi';
import { getAllProductosByEmprendedor } from '@/src/api/productoApi';
import ProductoList from '@/src/components/productoList';
import Pagination from '@/src/components/pagination';
import React, { useState, useEffect } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProductos = productos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(productos.length / itemsPerPage);


    return (
        <div className="mx-auto p-6 w-screen bg-gray-300">
            {emprendedor ? (
                <>
                    <div className="flex justify-start mb-4">
                        <button
                            onClick={() => router.push('/promocion-empresarial/emprendedores')}
                            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                            Regresar
                        </button>
                    </div>
                    <h2 className="mb-6 text-center text-2xl font-bold">Datos del Emprendedor</h2>
                    <div className="flex flex-col items-center justify-center space-y-6 mb-3 md:space-y-0 md:space-x-6">
                        <img
                            className="h-44 w-44 mb-4 rounded-full shadow-md"
                            src={`${process.env.NEXT_PUBLIC_API_URL}/emprendedor/${emprendedor.emprendedorId}/foto`}
                            alt="Foto del emprendedor"
                        />
                        <div className="w-full max-w-sm rounded-lg border bg-white p-4 shadow-md">
                            <p className="mb-2 text-lg"><strong>Nombre: </strong>{emprendedor.usuario.usuarioNombre}</p>
                            <p className="mb-2 text-lg"><strong>Apellidos: </strong>{emprendedor.usuario.usuarioApellidoMaterno} {emprendedor.usuario.usuarioApellidoPaterno}</p>
                            <p className="mb-2 text-lg"><strong>RUC: </strong>{emprendedor.emprendedorRuc}</p>
                            <p className="mb-2 text-lg"><strong>Razón Social: </strong>{emprendedor.emprendedorRazonSocial}</p>
                            <p className="text-lg"><strong>Rubro: </strong>{emprendedor.rubro.rubroNombre}</p>
                        </div>
                    </div>
                    <ProductoList productos={currentProductos} />
                    
                    {productos.length > 0 ? (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                            onPageChange={handlePageChange}
                        />
                    ) : (
                        <p className='text-center'>Ningun producto por mostrar</p>
                    )}
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Page;

