import React from 'react'

const userDataForm = () => {
    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Nombres de usuario */}
                        <div className="sm:col-span-3">
                            <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre de Usuario
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Nombres */}
                        <div className="sm:col-span-3">
                            <label htmlFor="nombres" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombres
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Apellido Paterno */}
                        <div className="sm:col-span-3">
                            <label htmlFor="apellido-paterno" className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido Paterno
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Apellido Materno */}
                        <div className="sm:col-span-3">
                            <label htmlFor="apellido-materno" className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido Materno
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Dni */}
                        <div className="sm:col-span-3">
                            <label htmlFor="dni" className="block text-sm font-medium leading-6 text-gray-900">
                                Dni
                            </label>
                            <div className="mt-2">
                                <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="sm:col-span-3">
                            <label htmlFor="telefono" className="block text-sm font-medium leading-6 text-gray-900">
                                Teléfono
                            </label>
                            <div className="mt-2">
                                <input type="tel" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Correo */}
                        <div className="sm:col-span-6">
                            <label htmlFor="correo" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo
                            </label>
                            <div className="mt-2">
                                <input type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="rounded-md text-sm font-semibold leading-6 px-3 py-2 bg-indigo-600 text-white">
                        Editar
                    </button>

                </div>
            </div>
        </form>
    )
}

export default userDataForm
