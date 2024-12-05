import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eliminarMarca, getAllMarcasByEmprendedor, registerMarca, editMarca as apiEditMarca } from '../api/marcaApi';

export const fetchMarcasByEmprendedor = createAsyncThunk('marcas/fetchMarcasByEmprendedor', async (emprendedorId) => {

  const response = await getAllMarcasByEmprendedor(emprendedorId)
  return response.data
})

export const addNewMarca = createAsyncThunk('marcas/addNewMarca', async (datos_marca) => {
  const response = await registerMarca(datos_marca)
  return response.data
})

export const deleteMarca = createAsyncThunk('marcas/deleteMarca', async (marcaId) => {
  await eliminarMarca(marcaId)
  return marcaId
})

export const editMarca = createAsyncThunk(
  'marcas/editMarca',
  async (datos_marca, { rejectWithValue }) => {
    try {
      const response = await apiEditMarca(datos_marca);
      console.log("Respuesta", response);
      console.log("Respuesta", response.data);
      return response;
    } catch (error) {
      // Manejo de errores
      console.error("Error al editar la marca:", error);

      if (error.response) {
        // Errores de respuesta del servidor
        const status = error.response.status;
        const message = error.response.data || "Error desconocido en el servidor.";
        console.error(`Error ${status}:`, message);

        return rejectWithValue({
          status,
          message: `El servidor devolvió un error: ${message}`,
        });
      } else if (error.request) {
        // Errores de conexión o sin respuesta
        console.error("Error de conexión o sin respuesta del servidor:", error.request);

        return rejectWithValue({
          status: null,
          message: "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
        });
      } else {
        // Otros errores
        console.error("Error desconocido:", error.message);

        return rejectWithValue({
          status: null,
          message: `Ocurrió un error inesperado: ${error.message}`,
        });
      }
    }
  }
);

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
      .addCase(addNewMarca.fulfilled, (state, action) => {
        state.marcas.push(action.payload)
        state.status = 'succeeded';
      })
      .addCase(addNewMarca.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMarca.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.marcas = state.marcas.filter(marca => marca.marcaId !== action.payload)
      })
      .addCase(deleteMarca.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editMarca.fulfilled, (state, action) => {
        console.log("payload:", action.payload)
        state.status = 'succeeded';
        if (action.payload?.marcaId) {
          console.log(action.payload)
          state.marcas = state.marcas.map((marca) =>
            marca.marcaId === action.payload.marcaId ? action.payload : marca
          );
        } else {
          console.error("No se encontró marcaId en la respuesta");
        }
      })
      .addCase(editMarca.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });

  }
});

export default marcaSlice.reducer;
