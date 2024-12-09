'use client'

import React from 'react'
import { useForm } from 'react-hook-form';

import RegistrarEmprendedor from '@/components/registrarEmprendedor';

const RegistrarEmprendedorPage = () => {

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

  return (
    <div className="min-w-full min-h-screen bg-gray-300  flex justify-center items-center">
      <div className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12 p-4">
        <RegistrarEmprendedor
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          setValue={setValue}
          reset={reset}
        />
      </div>

    </div>

  )
}

export default RegistrarEmprendedorPage