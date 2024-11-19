import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewMarca,fetchMarcasByEmprendedor } from '../store/marcaSlice'
import { useEmprendedor } from '../context/EmprendedorContext'
import { showSuccessMessage, showErrorMessage } from '../app/utils/messages'

const MarcaForm = ({ closeModal, register, handleSubmit, errors, reset }) => {

    const dispatch = useDispatch()
    const [selectedFoto, setSelectedFoto] = useState(null);
    const { emprendedorId } = useEmprendedor();
    const [fotoUrl, setFotoUrl] = useState(null);
  
    const onSubmit = async (data) => {

        try {

            const formData = new FormData();

            const datos_marca = {
                "marcaNombre": data.marcaNombre,
                "emprendedor": {
                    "emprendedorId": emprendedorId
                }
            }
            
            formData.append('marca', JSON.stringify(datos_marca))
            formData.append('foto', selectedFoto)

            dispatch(addNewMarca(formData)).then((response) => {

                if (response.type === 'marcas/addNewMarca/fulfilled') {
                    showSuccessMessage('Registro exitoso', 'El registro se ha realizado con éxito');
                    reset()
                    closeModal()
                    setSelectedFoto(null);
                    dispatch(fetchMarcasByEmprendedor(emprendedorId));
                } else {
                    const errorMessage = response.error?.message || 'Hubo un problema al realizar el registro. Verifica los datos e intenta nuevamente.';
                    showErrorMessage('Error en el registro', errorMessage);
                }
            })

        } catch (error) {
            console.error("Error inesperado:", error);
            showErrorMessage('Error inesperado', error.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.');
        }

    }
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setSelectedFoto(file); 
        setFotoUrl(URL.createObjectURL(file)); 
    };
    
    return (

        <form onSubmit={handleSubmit(onSubmit)}>


            <div className="mb-4">
                <label htmlFor="marcaNombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la marca</label>
                <input type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('marcaNombre', { required: true })} />
                {errors.marcaNombre && <span className="text-red-500">El nombre de la marca es requerido</span>}
            </div>

            {selectedFoto  && (
                <div className="col-span-full my-3">
                    <img
                         src={fotoUrl}
                        alt="Foto del emprendedor"
                        className="rounded-md w-40 h-40 object-cover"
                    />
                </div>
            )}

            <div className='col-span-full'>
                <div className="space-y-8 font-[sans-serif] max-w-md mx-auto">
                    <input type="file" className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 
                    file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
                        accept="image/*"
                        onChange={handleFotoChange}
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2" onClick={closeModal}>
                    Cerrar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Registrar
                </button>
            </div>
        </form>
    )
}

export default MarcaForm
