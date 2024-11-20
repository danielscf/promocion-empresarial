import axios from "axios";

const productoApi = axios.create({

    baseURL: process.env.NEXT_PUBLIC_API_URL + '/producto'

})

export const registrarProducto = (producto) => productoApi.post('',producto)

export const getAllProductosByEmprendedor = (emprendedorId) => productoApi.get(`/emprendedor/${emprendedorId}`)

export const getProductoById = (productoId) => productoApi.get(`/${productoId}`)

export const deleteProducto = (productoId) => productoApi.delete(`/${productoId}`)


export const editarProducto = async (formData) => {
    try {
        const productoId = formData.get('productoId');
        const emprendedorId = formData.get('emprendedorId');

        const productoDto = {
            productoId: formData.get('productoId'),
            productoNombre: formData.get('productoNombre'),
            productoDescripcion: formData.get('productoDescripcion'),
            tipoProducto: {
                tipoProductoId: formData.get('tipoProductoId'),
                tipoProductoNombre: formData.get('tipoProductoNombre'),
            },
        };

        const response = await productoApi.put(
            '',  
            productoDto,  
            {
                params: { productoId, emprendedorId },
            }
        );
        console.log('Respuesta API:', response.data);  
        return response.data;
    } catch (error) {
        console.error('Error al editar el producto:', error);
        throw error;
    }
};


