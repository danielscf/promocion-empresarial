import React from 'react'
import UserDataForm from '@/components/userDataForm'
const DatosPersonales = () => {
    return (
        <div className='p-4 w-screen bg-gray-300'>
            <h1 className='mt-2 text-center text-2xl font-bold'>Datos Personales</h1>
            <UserDataForm />
        </div>
    )
}

export default DatosPersonales