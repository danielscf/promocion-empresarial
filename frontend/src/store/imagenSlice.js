import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { editarImagen, registerImagen } from '../api/imagenApi';

export const addNewImagen = createAsyncThunk('imagenes/addNewImagen', async (nuevaImagen) => {
    const response = await registerImagen(nuevaImagen);
    return response.data;
});

export const editImagen = createAsyncThunk('imagenes/editImagen', async (imagen) => {
    const response = await editarImagen(imagen)
    return response.data
})

const imagenSlice = createSlice({
    name: 'imagenes',
    initialState: {
        imagenes: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder           
            .addCase(addNewImagen.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewImagen.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.imagenes.push(action.payload);
            })
            .addCase(addNewImagen.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(editImagen.fulfilled, (state,action) => {
                state.status = 'failed'
                state.imagenes = state.imagenes.map(imagen =>
                    imagen.imagenId === action.payload.imagenId ? action.payload : imagen
                )
            })
         
    }
});

export default imagenSlice.reducer;
