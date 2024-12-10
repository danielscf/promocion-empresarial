'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSolicitudes } from '@/store/solicitudSlice';
import Solicitud from '@/components/solicitud';
import Pagination from '@/components/pagination';

const SolicitudesPage = () => {

  const dispatch = useDispatch()
  const solicitudes = useSelector((state) => state.solicitudes.solicitudes)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const solicitudesFiltradas = solicitudes.filter(solicitud => solicitud.solicitudEstado !== 3 && solicitud.solicitudEstado !== 2)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolicitudes = solicitudesFiltradas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(solicitudesFiltradas.length / itemsPerPage);

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

    dispatch(fetchSolicitudes())

  }, [dispatch])

  return (
    <div className={`${currentSolicitudes.length < 3 ? 'h-screen' : ''} p-4 bg-gray-100`}>
      <h1 className="my-6 text-center text-2xl text-black font-bold">Solicitudes</h1>

      <Solicitud solicitudes={currentSolicitudes} />

      <div className="flex flex-col justify-center w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>

  )
}

export default SolicitudesPage