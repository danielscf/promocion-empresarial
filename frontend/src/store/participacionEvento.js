import { deleteParticipante, getAllParticipantes } from '@/api/participacionApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchParticipacionByEvento = createAsyncThunk('productos/fetchParticipacionByEvento ', async (eventoId) => {
    const response = await getAllParticipantes(eventoId)
    return response.data
})

export const deleteParticipacion = createAsyncThunk('productos/deleteParticipacion', async (eventoId, { rejectWithValue }) => {
    try {
        await deleteParticipante(eventoId);
        return eventoId;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
}
);


const participacionSlice = createSlice({
    name: 'participaciones',
    initialState: {
        participaciones: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchParticipacionByEvento.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.participaciones = action.payload
            })
            .addCase(deleteParticipacion.fulfilled, (state, action) => {
                console.log("Participacion eliminado con ID:", action.payload);
                state.participaciones = state.participaciones.filter(
                    (participacion) => participacion.participacionEventoId !== action.payload
                );
            })            
            .addCase(deleteParticipacion.rejected, (state, action) => {
                state.error = action.payload;
            });


    }
});

export default participacionSlice.reducer;