import { createSlice} from '@reduxjs/toolkit';

export const alertSlice = createSlice({
    name:"alert",
    initialState: {
        loading: false,
    },
    reducers:{
        showLoading:(state)=>{
            state.loading = true
        },
        hiddenLoading:(state)=>{
            state.loading = false
        }
    }
})
export const { showLoading, hiddenLoading } = alertSlice.actions