import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSolicitud } from '../services/solicitudService';

export const addNewSolicitud = createAsyncThunk('solicitud/addNewSolicitud', async (nuevoSolicitud) => {

    const datos = {
        "usuario": {
            "usuarioDni": nuevoSolicitud.usuarioDni,
            "usuarioNombre": nuevoSolicitud.usuarioNombre,
            "usuarioApellidoPaterno": nuevoSolicitud.usuarioApellidoPaterno,
            "usuarioApellidoMaterno": nuevoSolicitud.usuarioApellidoMaterno,
            "usuarioCorreo": nuevoSolicitud.usuarioCorreo,
            "usuarioTelefono": nuevoSolicitud.usuarioTelefono,
            "usuarioFechaNacimiento": nuevoSolicitud.usuarioFechaNacimiento
        },
        "emprendedor": {
            "emprendedorRuc": nuevoSolicitud.emprendedorRuc,
            "emprendedorDireccion": nuevoSolicitud.emprendedorDireccion,
            "emprendedorRazonSocial": nuevoSolicitud.emprendedorRazonSocial,
            "emprendedorEstadoContribuyente": 0,
            "emprendedorCondicionContribuyente": 0,
            "emprendedorFoto": nuevoSolicitud.emprendedorFoto,
            "rubro": {
                "rubroId": nuevoSolicitud.rubroId,
                "rubroNombre": nuevoSolicitud.rubroNombre
            },
            "tipoContribuyente": {
                "tipoContribuyenteId": nuevoSolicitud.tipoContribuyenteId,
                "tipoContribuyenteNombre": nuevoSolicitud.tipoContribuyenteNombre
            },
            "tipoActividad": {
                "tipoActividadId": nuevoSolicitud.tipoActividadId,
                "tipoActividadNombre": nuevoSolicitud.tipoActividadNombre
            }
        }
    }

    const response = await createSolicitud(datos)
    return response.data;
});

const solicitudSlice = createSlice({
    name: 'solicitud',
    initialState: {
        solicitud: [],
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
                state.solicitud.push(action.payload);
            })
            .addCase(addNewSolicitud.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default solicitudSlice.reducer;
