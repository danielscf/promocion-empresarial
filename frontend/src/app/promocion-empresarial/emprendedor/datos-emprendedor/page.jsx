'use client'

import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/src/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmprendedor } from '@/src/store/emprendedorSlice';
import EmprendedorForm from '@/src/components/emprendedorForm';

const datosEmprendedor = () => {

    const { register, handleSubmit, reset,setValue, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext)
    const dispatch = useDispatch()
    const user_emprendedor = useSelector((state) => state.emprendedor.emprendedor)
    const status = useSelector((state) => state.emprendedor.status);


    useEffect(() => {
       
        if (status === 'idle') {
            dispatch(fetchEmprendedor(user?.usuarioUsuario));
            console.log(user_emprendedor);
        }

    }, [status]);

    return (
        <div className='p-4 w-screen bg-gray-300 '>
            <h1 className='mt-2 text-center text-2xl font-bold'>Datos del emprendedor</h1>
            <EmprendedorForm
                register={register}
                handleSubmit={handleSubmit}
                reset={reset}
                user_emprendedor={user_emprendedor}
                errors={errors}
                dispatch={dispatch}
                setValue={setValue}
                user={user}
            />

        </div >
    )
}

export default datosEmprendedor