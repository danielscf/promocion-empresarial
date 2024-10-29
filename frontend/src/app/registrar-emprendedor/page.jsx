'use client'

import React from 'react'
import { useForm } from 'react-hook-form';

import RegistrarEmprendedor from '@/src/components/registrarEmprendedor';

const registrarEmprendedorPage = () => {

  const { register, handleSubmit,reset, formState: { errors },setValue } = useForm();

  return (
    <div className="min-w-full min-h-screen bg-gray-300  flex justify-center items-center">
      <div className="w-1/2 p-4">
        <RegistrarEmprendedor 
        register={register} 
        handleSubmit={handleSubmit} 
        errors={errors} 
        setValue={setValue}
        reset={reset}/>
      </div>
    </div>

  )
}

export default registrarEmprendedorPage