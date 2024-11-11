import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTipoActividad } from '../api/tipoActividadApi';

export const fetchTipoActividad = createAsyncThunk('tipoActividad/fetchTipoActividad',async () => {

    const response = await getAllTipoActividad()
    return response.data

})

const tipoActividadSlice = createSlice({
    name:'tipoActividad',
    initialState:{
        tipoActividad:[],
        status: 'idle',
        error: null
    },reducers:{

    },extraReducers:(builder) => {
        builder
        .addCase(fetchTipoActividad.fulfilled,(state,action) => {
            state.tipoActividad = action.payload
        }).addCase(fetchTipoActividad.pending, (state) => {
            state.status = 'loading';
        })
    }

})

export default tipoActividadSlice.reducer