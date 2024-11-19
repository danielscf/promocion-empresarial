import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eliminarMarca, getAllMarcasByEmprendedor, registerMarca, editMarca as apiEditMarca } from '../api/marcaApi';

export const fetchMarcasByEmprendedor = createAsyncThunk('marcas/fetchMarcasByEmprendedor', async (emprendedorId) => {

    const response = await getAllMarcasByEmprendedor(emprendedorId)
     return response.data
})

export const addNewMarca = createAsyncThunk('marcas/addNewMarca',async (datos_marca) => {
    const  response = await registerMarca(datos_marca)
    return response.data
})

export const deleteMarca = createAsyncThunk('marcas/deleteMarca', async (marcaId) => {
    const response = await eliminarMarca(marcaId)
    return response.data
})

export const editMarca = createAsyncThunk('marcas/editMarca', async (datos_marca) => {
    const response = await apiEditMarca(datos_marca)
    return response.data
})

const marcaSlice = createSlice({
    name: 'marcas',
    initialState: {
        marcas: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarcasByEmprendedor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMarcasByEmprendedor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.marcas = action.payload;
            })
            .addCase(fetchMarcasByEmprendedor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewMarca.fulfilled, (state,action) => {
                  state.marcas.push(action.payload) 
                  state.status = 'succeeded';
            })
            .addCase(addNewMarca.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMarca.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.marcas = state.marcas.filter(marca => marca.marcaId !== action.payload.marcaId)
            })
            .addCase(deleteMarca.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editMarca.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload?.marcaId) {
                    state.marcas = state.marcas.map((marca) => 
                        marca.marcaId === action.payload.marcaId ? action.payload : marca
                    );
                } else {
                    console.error("No se encontró marcaId en la respuesta");
                }
            });
            
    }
});

export default marcaSlice.reducer;
