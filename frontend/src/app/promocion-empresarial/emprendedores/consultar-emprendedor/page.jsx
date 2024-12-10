'use client'

import React, { useState, useEffect } from 'react';
import EmprendedorList from '@/components/emprendedorList';
import Pagination from '@/components/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getAllEmprendedores, findEmprendedorByDni, findEmprendedorByRuc } from '@/api/emprendedorApi';
import { alertPersonalizado } from '@/app/utils/messages';

const ConsultarEmprendedorPage = () => {
    
    const [selectedOption, setSelectedOption] = useState('');
    const [emprendedores, setEmprendedores] = useState([]);
    const [filteredEmprendedor, setFilteredEmprendedor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [dniError, setDniError] = useState(null)
    const [rucError, setRucError] = useState(null)
    const [valueBusqueda, setvalueBusqueda] = useState(null)


    const handleInputChange = (e) => {
        const digitos = e.target.value.replace(/\D/g, "");
        const mensaje = selectedOption === 'dni' ? 'El DNI debe tener máximo 8 dígitos' :
            'El RUC debe tener máximo 11 dígitos'
        const limite = selectedOption === 'dni' ? 8 : 11

        if (digitos.length > limite) {
            e.target.value = digitos.slice(0, limite)
            setvalueBusqueda(e.target.value)
        }
        if (digitos.length > limite) {
            if (selectedOption === "dni") setDniError(mensaje);
            if (selectedOption === "ruc") setRucError(mensaje)
            setTimeout(() => {
                if (selectedOption === "dni") setDniError("");
                if (selectedOption === "ruc") setRucError("");
            }, 2000);
        }
    };

    const handleClickSearch = async () => {
        if (!valueBusqueda || !selectedOption) {
            alertPersonalizado('', 'Por favor proporciona un criterio o valor válido.');
            return;
        }

        try {
            const searchFn = selectedOption === 'dni' ? findEmprendedorByDni : findEmprendedorByRuc;
            const response = await searchFn(valueBusqueda);
            setFilteredEmprendedor(response.data);
        } catch (error) {
            console.error('Error al buscar emprendedor:', error);
            alertPersonalizado('', 'No se encontró el emprendedor.');
        }
    };


    useEffect(() => {
        const cargarEmprendedores = async () => {
            const response = await getAllEmprendedores();
            setEmprendedores(response.data);
        };
        cargarEmprendedores();
    }, []);

    const filtroEmprendedores = emprendedores.filter(emprendedor => emprendedor.usuario.usuarioEstado === 2)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmprendedores = filtroEmprendedores.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtroEmprendedores.length / itemsPerPage);

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

    return (
        <div className="text-center bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-black mb-4">CONSULTAR EMPRENDEDOR</h1>
            <div className="flex flex-col md:flex-row xl:flex-row sm:flex-row items-center justify-center gap-4 mb-6">
                <select
                    className="p-2 border rounded-md text-gray-600"
                    value={selectedOption}
                    onChange={(e) => {
                        setSelectedOption(e.target.value)
                        setFilteredEmprendedor(null);
                    }}
                >
                    <option value="">SELECCIONA UNA OPCION</option>
                    <option value="dni">Dni</option>
                    <option value="ruc">Ruc</option>
                </select>
                <div>
                    <input
                        type="text"
                        placeholder={selectedOption === 'dni' ? 'Ingrese DNI' : selectedOption === 'ruc' ? 'Ingrese RUC' : 'Seleccione un criterio'}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/\D/g, "");
                        }}
                        onChange={(e) => {
                            setvalueBusqueda(e.target.value)
                            handleInputChange(e);
                        }}
                    />

                    <button className="p-2 bg-blue-800 text-white rounded-md" onClick={handleClickSearch}>
                        <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>
            <div>
                {dniError && <span className="text-red-500 text-sm mt-1">{dniError}</span>}
                {rucError && <span className="text-red-500 text-sm mt-1">{rucError}</span>}
            </div>

            {filteredEmprendedor ? (

                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold text-black mb-2">Resultado de la búsqueda:</h2>
                    <EmprendedorList emprendedores={[filteredEmprendedor]} />
                </div>
            ) : (

                <>
                    <EmprendedorList emprendedores={currentEmprendedores} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}

export default ConsultarEmprendedorPage
