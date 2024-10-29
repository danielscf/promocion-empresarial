import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import rubroReducer from './rubroSlice'
import tipoContribuyenteReducer from './tipoContribuyenteSlice'
import tipoActividadReducer from './tipoActividadSlice'
import solicitudReducer from './solicitudSlice'

export const store = configureStore({
    reducer: {
        usuarios: userReducer,
        rubros:rubroReducer,
        tipoContribuyentes:tipoContribuyenteReducer,
        tipoActividad:tipoActividadReducer,
        solicitud:solicitudReducer
    }
});
