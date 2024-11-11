import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsuarios, deleteUsuario as apiDeleteUsuario, createUsuario,editUsuario as apiEditUsuario, 
        habilitarUsuario as apihabilitarUsuario} from '../api/userApi';


export const fetchUsuarios = createAsyncThunk('usuarios/fetchUsuarios', async () => {
    const response = await getAllUsuarios();
    return response.data;
});
export const addNewUsuario = createAsyncThunk('usuarios/addNewUsuario', async (nuevoUsuario) => {
    const response = await createUsuario(nuevoUsuario);
    return response.data;
});
export const editUsuario = createAsyncThunk('usuarios/editUsuario', async (usuario, { rejectWithValue }) => {
    try {
        const response = await apiEditUsuario(usuario);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const deleteUsuario = createAsyncThunk('usuarios/deleteUsuario', async (id) => {
    const response = await apiDeleteUsuario(id)
    return response.data;
})

export const habilitarUsuario = createAsyncThunk('usuario/habilitarUsuario',async(id) => {
    const response = await apihabilitarUsuario(id)
    return response.data
})

const userSlice = createSlice({
    name: 'usuarios',
    initialState: {
        usuarios: [],
        cambioEstadoUsuario : null,
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsuarios.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsuarios.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usuarios = action.payload;
            })
            .addCase(fetchUsuarios.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewUsuario.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewUsuario.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usuarios.push(action.payload);
            })
            .addCase(editUsuario.fulfilled, (state,action) => {
                state.status = 'succeeded'
                state.usuarios = state.usuarios.map((user) =>
                    user.usuarioId === action.payload.usuarioId ? action.payload.usuario : user
                );
            })
            .addCase(addNewUsuario.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteUsuario.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteUsuario.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usuarios = state.usuarios.filter((user) => user.usuarioId !== action.payload.usuarioId);
            })
            .addCase(deleteUsuario.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(habilitarUsuario.fulfilled, (state,action) => {
                state.status = 'failed'
                state.cambioEstadoUsuario = action.payload
            });
    }
});

export default userSlice.reducer;
