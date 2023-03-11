import { createSlice } from '@reduxjs/toolkit'
import { selectProduct } from '../api/productApi'

const initialState = {
    loading: false,
    product: {},
    success: false,
    error: '',
}

const selectedItemSlice = createSlice({
    name: 'selectedItem',
    initialState,
    extraReducers: (builder) => {
        //builder.addCase getProduct
        builder.addCase(selectProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(selectProduct.fulfilled, (state, action) => {
            state.loading = false
            state.product = action.payload
            state.error = ''
        })
        builder.addCase(selectProduct.rejected, (state, action) => {
            state.loading = false
            state.product = []
            state.error =  action.error.message
        })
    }
})

export default selectedItemSlice.reducer