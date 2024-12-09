import React from 'react'
import UserDataForm from '@/components/userDataForm'

const DatosPersonalesPage = () => {

    return (
        <>
            <h1 className='mt-2 text-center text-black text-2xl font-bold'>Datos Personales</h1>
            <div className='bg-white shadow-lg border border-gray-300 p-6 my-5 rounded-xl'>
                <UserDataForm />
            </div>
        </>
    )
}

export default DatosPersonalesPage
