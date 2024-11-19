import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEmprendorByUsername, editEmprendedor as apiEditEmprendedor } from '../api/emprendedorApi';


export const fetchEmprendedor = createAsyncThunk('emprendedor/fetchEmprendedor', async (username) => {
    const response = await getEmprendorByUsername(username);
    return response.data;
});

export const editEmprendedor = createAsyncThunk('emprendedor/editEmprendedor', async (datos_emprendedor) => {

    const response = await apiEditEmprendedor(datos_emprendedor)
    return response.data
 })

const emprendedorSlice = createSlice({
    name: 'emprendedor',
    initialState: {
        emprendedor: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmprendedor.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmprendedor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.emprendedor = action.payload;
            })
            .addCase(fetchEmprendedor.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editEmprendedor.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.emprendedor = {
                    ...state.emprendedor,  
                    ...action.payload      
                };
            });
            
    }
});

export default emprendedorSlice.reducer;
