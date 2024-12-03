import { createEvento, editarEvento, getAllEvento } from '@/api/eventoApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchEventos = createAsyncThunk('eventos/fetchEventos', async () => {
    const response = await getAllEvento()
    return response.data;
});

export const addNewEvento = createAsyncThunk('eventos/addNewEvento', async (formData, { rejectWithValue }) => {
    try {
        const response = await createEvento(formData);
        return response; 
    } catch (error) {
        console.error('Error en addNewEvento:', error);
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const editEvento = createAsyncThunk(
    'eventos/editEvento', 
    async ({ formData, eventoId }, { rejectWithValue }) => {  
        try {
            const response = await editarEvento(formData, eventoId);  
            return response;
        } catch (error) {
            console.error('Error en editEvento:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



const eventoSlice = createSlice({
    name: 'eventos',
    initialState: {
        eventos: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEventos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventos = action.payload;
            })
            .addCase(fetchEventos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewEvento.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewEvento.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventos.push(action.payload);
            })
            .addCase(addNewEvento.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editEvento.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editEvento.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.eventos = state.eventos.map(evento => 
                    evento.eventoId === action.payload.eventoId ? action.payload : evento
                )
            })
            .addCase(editEvento.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default eventoSlice.reducer;
