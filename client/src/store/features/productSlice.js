import { createSlice } from '@reduxjs/toolkit'
import { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct  } from '../api/productApi'

const initialState = {
    loading: false,
    products: [],
    success: false,
    error: '',
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        //builder.addCase getAllProducts
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error =  action.error.message
        })
        //builder.addCase getProduct
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(getProduct.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error =  action.error.message
        })
        //builder.addCase createProduct
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            state.error = ''
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error =  action.error.message
        })
        //builder.addCase updateProduct
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error =  action.error.message
        })
        //builder.addCase DeleteProduct
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error =  action.error.message
        })
    }
})

export default productSlice.reducer