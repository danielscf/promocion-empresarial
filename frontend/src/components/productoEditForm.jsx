import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useEmprendedor } from '../context/EmprendedorContext';
import { getProductoById } from '../api/productoApi';
import { useForm } from 'react-hook-form';
import { showErrorMessage, showSuccessMessage } from '../app/utils/messages';
import { getAllTipoProducto } from '../api/tipoProductoApi';
import { editProducto } from '../store/productoSlice';
import { editImagen } from '../store/imagenSlice';
import { fetchProductoByEmprendedor } from '../store/productoSlice';


const ProductoEditForm = ({ productoId, closeModal }) => {

    const dispatch = useDispatch()
    const [selectedFoto, setSelectedFoto] = useState(null);
    const { emprendedorId } = useEmprendedor();
    const [producto, setproducto] = useState(null)
    const [fotoUrl, setFotoUrl] = useState(null);
    const [tipoProducto, settipoProducto] = useState([])
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    useEffect(() => {
        let isMounted = true;
        const cargarTipoProductos = async () => {
            const response = await getAllTipoProducto();
            if (isMounted) settipoProducto(response.data);
        }
        cargarTipoProductos();

        const cargarProducto = async () => {
            const response = await getProductoById(productoId);
            if (isMounted) {
                setproducto(response.data);
                setValue('productoNombre', response.data.productoNombre);
                setValue('productoDescripcion', response.data.productoDescripcion);
                setValue('tipoProductoId', response.data.tipoProducto?.tipoProductoId);
                setValue('tipoProductoNombre', response.data.tipoProducto?.tipoProductoNombre);
            }
        };
        cargarProducto();
        return () => {
            isMounted = false;
        }
    }, [productoId, setValue]);


    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        setSelectedFoto(file);
        setFotoUrl(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {

        try {

            const formDataProducto = new FormData();

            formDataProducto.append('productoId', productoId)
            formDataProducto.append('emprendedorId', emprendedorId)
            formDataProducto.append('productoNombre', data.productoNombre)
            formDataProducto.append('productoDescripcion', data.productoDescripcion)
            formDataProducto.append('tipoProductoId', data.tipoProductoId)
            formDataProducto.append('tipoProductoNombre', data.tipoProductoNombre)

            console.log("Datos en FormDataProducto:");
            console.log("productoId:", productoId);
            console.log("emprendedorId:", emprendedorId);
            console.log("productoNombre:", data.productoNombre);
            console.log("tipoProductoId:", data.tipoProductoId);
            console.log("productoDescripcion:", data.productoDescripcion);
            console.log("tipoProductoNombre:", data.tipoProductoNombre);

            const formDataImagen = new FormData()

            formDataImagen.append('imagenId', producto?.imagenes?.[0]?.imagenId)
            formDataImagen.append('imagen', selectedFoto)
            formDataImagen.append('productoId', productoId)

            dispatch(editProducto(formDataProducto)).then((response) => {

                if (response.type === 'productos/editProducto/fulfilled') {
                    console.log(response.payload);
                    dispatch(editImagen(formDataImagen))
                    showSuccessMessage('Edicion exitosa', 'Se ha editado el producto con éxito');
                    reset()
                    closeModal()
                    setSelectedFoto(null);
                    dispatch(fetchProductoByEmprendedor(emprendedorId));
                } else {
                    const errorMessage = response.error?.message || 'Hubo un problema al realizar la edicion. Verifica los datos e intenta nuevamente.';
                    showErrorMessage('Error en la edicion', errorMessage);
                }
            })

        } catch (error) {
            console.error("Error inesperado:", error);
            showErrorMessage('Error inesperado', error.message || 'Ocurrió un error inesperado. Inténtalo nuevamente.');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                    type="text"
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
                <label htmlFor="tipoProducto" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de producto
                </label>
                <select
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-indigo-500"
                    {...register('tipoProductoId', { required: true })}
                    onChange={(e) => {
                        const selectedOption = tipoProducto.find(tipo => tipo.tipoProductoId === parseInt(e.target.value));
                        setValue('tipoProductoId', e.target.value);
                        setValue('tipoProductoNombre', selectedOption?.tipoProductoNombre || '');
                    }}
                >
                    <option value="">Selecciona un tipo de producto</option>
                    {tipoProducto.map(tipo => (
                        <option key={tipo.tipoProductoId} value={tipo.tipoProductoId}>
                            {tipo.tipoProductoNombre}
                        </option>
                    ))}
                </select>
                {errors.tipoProductoId && (
                    <span className="text-red-500">El tipo de producto es requerido</span>
                )}
            </div>

            {(selectedFoto || producto?.imagenes?.[0]?.imagenId) && (
                <div className="col-span-full my-3">
                    <img
                        src={selectedFoto ? fotoUrl : producto?.imagenes?.[0]?.imagenId ? `${process.env.NEXT_PUBLIC_API_URL}/imagen/${producto?.imagenes?.[0]?.imagenId}/foto` : ""}
                        alt="Foto del producto"
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

export default ProductoEditForm
