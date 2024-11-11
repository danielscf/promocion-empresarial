'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSolicitudes } from '@/src/store/solicitudSlice';
import Solicitud from '@/src/components/solicitud';

const SolicitudesPage = () => {

  const dispatch = useDispatch()
  const solicitudes = useSelector((state) => state.solicitudes.solicitudes)

  useEffect(() => {

    dispatch(fetchSolicitudes())
 
  }, [dispatch])

  return (
    <div className='p-4 w-screen h-screen bg-gray-300 '>
      <h1 className='my-6 text-center text-2xl font-bold'>Solicitudes</h1>
      <Solicitud solicitudes={solicitudes} />
    </div>
  )
}

export default SolicitudesPage