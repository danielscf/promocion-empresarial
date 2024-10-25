'use client'

import React from 'react'

import RegistrarEmprendedor from '@/src/components/registrarEmprendedor';

const registrarEmprendedorPage = () => {


  return (
    <div className="min-w-full min-h-screen bg-gray-300  flex justify-center items-center">
      <div className="w-1/2 p-4">
        <RegistrarEmprendedor />
      </div>
    </div>

  )
}

export default registrarEmprendedorPage