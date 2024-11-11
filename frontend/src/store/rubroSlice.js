import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRubro } from '../api/rubroApi';

export const fetchRubros = createAsyncThunk('rubros/fetchRubros',async () => {

    const response = await getAllRubro()
    return response.data

})

const rubroSlice = createSlice({
    name:'rubros',
    initialState:{
        rubros:[],
        status: 'idle',
        error: null
    },reducers:{

    },extraReducers:(builder) => {
        builder
        .addCase(fetchRubros.fulfilled,(state,action) => {
            state.rubros = action.payload
        }).addCase(fetchRubros.pending, (state) => {
            state.status = 'loading';
        })
    }

})

export default rubroSlice.reducer