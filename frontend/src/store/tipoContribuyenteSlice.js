import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTipoContribuyente } from '../api/tipoContribuyenteApi';

export const fetchTipoContribuyente = createAsyncThunk('tipoContribuyentes/fetchTipoContribuyente',async () => {

    const response = await getAllTipoContribuyente()
    return response.data

})

const tipoContribuyenteSlice = createSlice({
    name:'tipoContribuyentes',
    initialState:{
        tipoContribuyentes:[],
        status: 'idle',
        error: null
    },reducers:{

    },extraReducers:(builder) => {
        builder
        .addCase(fetchTipoContribuyente.fulfilled,(state,action) => {
            state.tipoContribuyentes = action.payload
        }).addCase(fetchTipoContribuyente.pending, (state) => {
            state.status = 'loading';
        })
    }

})

export default tipoContribuyenteSlice.reducer