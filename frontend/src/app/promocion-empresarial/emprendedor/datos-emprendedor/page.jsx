'use client';

import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmprendedor } from '@/store/emprendedorSlice';
import EmprendedorForm from '@/components/emprendedorForm';

const DatosEmprendedor = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const user_emprendedor = useSelector((state) => state.emprendedor.emprendedor);
    const status = useSelector((state) => state.emprendedor.status);

    useEffect(() => {
        
        if (status === 'idle' && user?.usuarioUsuario) {
            //console.log('Fetching emprendedor...');
            dispatch(fetchEmprendedor(user.usuarioUsuario));
        }
    }, [status, dispatch, user?.usuarioUsuario]);

   // console.log('Datos del emprendedor:', user_emprendedor);

    return (
        <>
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
        </>
    );
};

export default DatosEmprendedor;
