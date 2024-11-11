import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSolicitud,getAllSolicitud,getSolicitudById as apigetSolicitudById, aprobarSolicitud, rechazarSolicitud, eliminarSolicitud } from '../api/solicitudApi';

export const addNewSolicitud = createAsyncThunk('solicitudes/addNewSolicitud', async ({ nuevoSolicitud, selectedFile, emprendedorRuc }) => {
    const response = await createSolicitud(nuevoSolicitud, selectedFile, emprendedorRuc);
    return response.data;
});

export const fetchSolicitudes = createAsyncThunk('solicitudes/fetchSolicitudes',async () => {
   const response = await getAllSolicitud()
   return response.data
})

export const getSolicitudById = createAsyncThunk('solicitudes/getSolicitudById',async (solicitudId) => {
    const response = await apigetSolicitudById(solicitudId)
    return response.data
})

export const approveSolicitud = createAsyncThunk('solicitudes/approveSolicitud',async (solicitudId) => {
    const response = await aprobarSolicitud(solicitudId)
    return response.data
})

export const declineSolicitud = createAsyncThunk('solicitud/declineSolicitud',async (solicitudId) => {
    const response = await rechazarSolicitud(solicitudId)
    return response.data
})

export const deleteSolicitud = createAsyncThunk('solicitud/deleteSolicitud', async (solicitudId) => {
    const response = await eliminarSolicitud(solicitudId)
    return response.data
})

const solicitudSlice = createSlice({
    name: 'solicitudes',
    initialState: {
        solicitudes: [],
        nuevaSolicitud: null,
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewSolicitud.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addNewSolicitud.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.nuevaSolicitud = action.payload;
            })
            .addCase(addNewSolicitud.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchSolicitudes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.solicitudes = action.payload; 
            })
            .addCase(fetchSolicitudes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSolicitudById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSolicitudById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.nuevaSolicitud = action.payload;
            })
            .addCase(getSolicitudById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(approveSolicitud.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.nuevaSolicitud = action.payload
            })
            .addCase(declineSolicitud.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.nuevaSolicitud = action.payload
            })
            .addCase(deleteSolicitud.fulfilled,(state, action) => {
                state.status = 'succeeded'
                state.solicitudes = state.solicitudes.filter(solicitud => solicitud.solicitudId !== action.payload.solicitudId )
            });
    }
});

export default solicitudSlice.reducer;
