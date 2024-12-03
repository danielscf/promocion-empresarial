import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import rubroReducer from './rubroSlice'
import tipoContribuyenteReducer from './tipoContribuyenteSlice'
import tipoActividadReducer from './tipoActividadSlice'
import solicitudReducer from './solicitudSlice'
import emprendedorReducer from './emprendedorSlice'
import marcaReducer from './marcaSlice'
import productoReducer from './productoSlice'
import imagenReducer from './imagenSlice'
import eventoReducer from './eventoSlice'
import participacionReducer from './participacionEvento'

export const store = configureStore({
    reducer: {
        usuarios: userReducer,
        rubros: rubroReducer,
        tipoContribuyentes: tipoContribuyenteReducer,
        tipoActividad: tipoActividadReducer,
        solicitudes: solicitudReducer,
        emprendedor: emprendedorReducer,
        marcas:marcaReducer,
        productos:productoReducer,
        imagenes:imagenReducer,
        eventos:eventoReducer,
        participaciones:participacionReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;