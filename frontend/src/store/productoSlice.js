import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { editarProducto, getAllProductosByEmprendedor, registrarProducto, deleteProducto as deleteProductoApi } from '../api/productoApi';

export const addNewProducto = createAsyncThunk('productos/addNewProducto', async (nuevoProducto) => {
    const response = await registrarProducto(nuevoProducto);
    return response.data;
});

export const fetchProductoByEmprendedor = createAsyncThunk('productos/fetchProductoByEmprendedor', async (emprendedorId) => {
    const response = await getAllProductosByEmprendedor(emprendedorId)
    return response.data
})

export const editProducto = createAsyncThunk('productos/editProducto', async (producto) => {
    const response = await editarProducto(producto);
    //console.log('Tipo de respuesta de la API:', typeof response); 
    //console.log('Respuesta de la API:', response);
    return response;

});
export const deleteProducto = createAsyncThunk('productos/deleteProducto', async (productoId, { rejectWithValue }) => {
    try {
        await deleteProductoApi(productoId);
        return productoId;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);



const productoSlice = createSlice({
    name: 'productos',
    initialState: {
        productos: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductoByEmprendedor.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.productos = action.payload
            })
            .addCase(addNewProducto.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewProducto.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productos.push(action.payload);
            })
            .addCase(addNewProducto.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editProducto.fulfilled, (state, action) => {
                // console.log("Action Payload:", action.payload); 
                if (action.payload && action.payload.productoId) {
                    // Si el payload tiene datos, actualizamos el estado
                    state.status = 'succeeded';
                    state.productos = state.productos.map((producto) =>
                        producto.productoId === action.payload.productoId ? action.payload : producto
                    );
                } else {
                    console.error("Error: Payload no tiene los datos esperados.");
                }
            })
            .addCase(editProducto.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editProducto.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteProducto.fulfilled, (state, action) => {
                console.log("Producto eliminado con ID:", action.payload);
                state.productos = state.productos.filter(
                    (producto) => producto.productoId !== action.payload
                );
            })            
            .addCase(deleteProducto.rejected, (state, action) => {
                state.error = action.payload;
            });


    }
});

export default productoSlice.reducer;
