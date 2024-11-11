import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import rubroReducer from './rubroSlice'
import tipoContribuyenteReducer from './tipoContribuyenteSlice'
import tipoActividadReducer from './tipoActividadSlice'
import solicitudReducer from './solicitudSlice'
import emprendedorReducer from './emprendedorSlice'

export const store = configureStore({
    reducer: {
        usuarios: userReducer,
        rubros: rubroReducer,
        tipoContribuyentes: tipoContribuyenteReducer,
        tipoActividad: tipoActividadReducer,
        solicitudes: solicitudReducer,
        emprendedor: emprendedorReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;