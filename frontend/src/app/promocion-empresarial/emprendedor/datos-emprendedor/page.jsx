import React from 'react'

const datosEmprendedor = () => {
    return (
        <div className='p-4 w-screen bg-gray-300 '>
            <h1 className='mt-2 text-center text-2xl font-bold'>Datos del emprendedor</h1>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                       
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            {/* Marca */}
                            <div className="sm:col-span-6">
                                <label htmlFor="marca" className="block text-sm font-medium leading-6 text-gray-900">
                                    Marca 
                                </label>
                                <div className="mt-2">
                                    <img src="/path-to-your-logo.png" alt="logo" className="h-12 w-12" />
                                </div>
                            </div>

                            {/* Rubro */}
                            <div className="col-span-full">
                                <label htmlFor="rubro" className="block text-sm font-medium leading-6 text-gray-900">
                                    Rubro 
                                </label>
                                <div className="mt-2">
                                <div className="mt-2">
                                    <input
                                        id="rubro"
                                        name="rubro"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                </div>
                            </div>

                            {/* Foto */}
                            <div className="col-span-full">
                                <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                                    Foto
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <img src="/path-to-photo.png" alt="Foto" className="h-12 w-12 rounded-full" />
                                    
                                </div>
                            </div>

                            {/* Razón Social */}
                            <div className="sm:col-span-6">
                                <label htmlFor="razon-social" className="block text-sm font-medium leading-6 text-gray-900">
                                    Razón Social 
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="razon-social"
                                        name="razon-social"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* ruc */}
                            <div className="sm:col-span-3">
                                <label htmlFor="ruc" className="block text-sm font-medium leading-6 text-gray-900">
                                   Ruc
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="ruc"
                                        name="ruc"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            {/* Direccion */}
                            <div className="sm:col-span-3">
                                <label htmlFor="direccion" className="block text-sm font-medium leading-6 text-gray-900">
                                    Direccion
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="direccion"
                                        name="direccion"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="submit" className="rounded-md text-sm font-semibold leading-6 px-3 py-2 bg-indigo-600 text-white">
                            Editar
                        </button>
                       
                    </div>
                </div>
            </form>

        </div>
    )
}

export default datosEmprendedor