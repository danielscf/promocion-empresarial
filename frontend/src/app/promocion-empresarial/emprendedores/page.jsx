'use client'

import React, { useState, useEffect } from 'react';
import EmprendedorList from '@/components/emprendedorList';
import Pagination from '@/components/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getAllEmprendedores, findEmprendedorByDni, findEmprendedorByRuc } from '@/api/emprendedorApi';
import { alertPersonalizado } from '@/app/utils/messages';

const EmprendedoresPage = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [emprendedores, setEmprendedores] = useState([]);
    const [filteredEmprendedor, setFilteredEmprendedor] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [valueOption, setValueOption] = useState(null);
    const itemsPerPage = 5;

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setFilteredEmprendedor(null);
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); 
        selectedOption === '' ? e.target.value = '' : e.target.value
        setValueOption(value)
        if (selectedOption === 'dni' && value.length > 8) {
            alertPersonalizado('', 'El DNI debe tener máximo 8 dígitos.');
            e.target.value =  value.slice(0, 8)
        } else if (selectedOption === 'ruc' && value.length > 11) {
            alertPersonalizado('', 'El RUC debe tener máximo 11 dígitos.');
            e.target.value =  value.slice(0, 11)
        } else {
            setValueOption(value);
        }
    };
    
    const handleClickSearch = async () => {
        if (!selectedOption || !valueOption) {
            alertPersonalizado('Criterio no seleccionado', 'Por favor selecciona un criterio y proporciona un valor válido.');
            return;
        }
    
        try {
            const searchFn = selectedOption === 'dni' ? findEmprendedorByDni : findEmprendedorByRuc;
            const response = await searchFn(valueOption);
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
        <div className="text-center bg-gray-300 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-black mb-4">CONSULTAR EMPRENDEDOR</h1>
            <div className="flex flex-col md:flex-row xl:flex-row sm:flex-row items-center justify-center gap-4 mb-6">
                <select
                    className="p-2 border rounded-md text-gray-600"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="">SELECCIONAR BÚSQUEDA</option>
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
                        onChange={handleInputChange}
                    />
                    <button className="p-2 bg-blue-800 text-white rounded-md" onClick={handleClickSearch}>
                        <FontAwesomeIcon className="mx-3 cursor-pointer" icon={faMagnifyingGlass} />
                    </button>
                </div>
            </div>

            {filteredEmprendedor ? (

                <div className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-xl font-bold mb-2">Resultado de la búsqueda:</h2>
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
};

export default EmprendedoresPage;
