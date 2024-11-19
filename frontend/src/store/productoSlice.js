import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { editarProducto, getAllProductosByEmprendedor, registrarProducto } from '../api/productoApi';

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
    //console.log('Tipo de respuesta de la API:', typeof response); // Asegúrate de que sea un objeto
    //console.log('Respuesta de la API:', response);
    return response;  // Asegúrate de que esto es un objeto
    
});



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
            .addCase(fetchProductoByEmprendedor.fulfilled, (state,action) => {
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
               // console.log("Action Payload:", action.payload); // Verifica el contenido de payload
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
            });
            
         
    }
});

export default productoSlice.reducer;
