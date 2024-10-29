import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsuarios, createUsuario } from '../services/userService';


export const fetchUsuarios = createAsyncThunk('usuarios/fetchUsuarios', async () => {
    const response = await getAllUsuarios();
    return response.data;
});


export const addNewUsuario = createAsyncThunk('usuarios/addNewUsuario', async (nuevoUsuario) => {
    const response = await createUsuario(nuevoUsuario);
    return response.data;
});

const userSlice = createSlice({
    name: 'usuarios',
    initialState: {
        usuarios: [],
        status: 'idle',
        error: null
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsuarios.fulfilled, (state, action) => {
                state.usuarios = action.payload;
            })
            .addCase(addNewUsuario.fulfilled, (state, action) => {
                state.usuarios.push(action.payload); 
            })
            .addCase(fetchUsuarios.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsuarios.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
