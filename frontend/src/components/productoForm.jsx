import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useEmprendedor } from '../context/EmprendedorContext';
import { showSuccessMessage, showErrorMessage } from '../app/utils/messages';
import { getAllTipoProducto } from '../api/tipoProductoApi';
import { addNewProducto,fetchProductoByEmprendedor } from '../store/productoSlice';
import { addNewImagen } from '../store/imagenSlice';

const ProductoForm = ({register,handleSubmit,reset,errors,closeModal}) => {

    const dispatch = useDispatch()
    const [selectedFoto, setSelectedFoto] = useState(null);
    const { emprendedorId } = useEmprendedor();
    const [fotoUrl, setFotoUrl] = useState(null);
    const [tipoProducto, settipoProducto] = useState([])

    useEffect(() => {

        const cargarTipoProductos = async () => {
            const response = await getAllTipoProducto()
            settipoProducto(response.data)
        }
        cargarTipoProductos()

    }, [])

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setSelectedFoto(file);
        setFotoUrl(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {

        try {

            const producto = {
                "productoNombre": data.productoNombre,
                "productoDescripcion": data.productoDescripcion,
                "tipoProductoId": data.tipoProductoId,
                "emprendedorId": emprendedorId
            }
            const formData = new FormData();
        
            formData.append('imagen',selectedFoto)
        
            dispatch(addNewProducto(producto)).then((response) => {

                if (response.type === 'productos/addNewProducto/fulfilled') {
                    console.log(response.payload); 
                    formData.append('productoId', response.payload.productoId);
                    dispatch(addNewImagen(formData))
                    showSuccessMessage('Registro exitoso', 'El registro se ha realizado con éxito');
                    dispatch(fetchProductoByEmprendedor(emprendedorId));
                    reset()
                    closeModal()
                    setSelectedFoto(null);
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

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('productoNombre', { required: true })}
                />
                {errors.productoNombre && <span className="text-red-500">El nombre del producto es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
                <input
                    type="text" className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('productoDescripcion', { required: true })}
                />
                {errors.productoDescripcion && <span className="text-red-500">La descripcion es requerido</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="tipoProducto" className="block text-sm font-medium text-gray-700 mb-1">Tipo de producto</label>
                <select className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500" {...register('tipoProductoId', { required: true })}>
                    <option value="">Selecciona un tipo de producto</option>
                    {tipoProducto.map(tipoProduct => (
                        <option key={tipoProduct.tipoProductoId} value={tipoProduct.tipoProductoId}>{tipoProduct.tipoProductoNombre}</option>
                    ))}
                </select>
                {errors.tipoProductoId && <span className="text-red-500">El tipo de producto es requerido</span>}
            </div>

            {selectedFoto && (
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

export default ProductoForm
