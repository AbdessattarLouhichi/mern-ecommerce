import { createSlice } from '@reduxjs/toolkit'
import { addCart,getAllCarts, getCart, removeItem, updateCart, deleteCart } from '../api/cartApi'

const initialState = {
    loading: false,
    carts: [],
    success: false,
    error: '',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        //create new Cart and add carts
        builder.addCase(addCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addCart.fulfilled, (state, action) => {
            state.loading = false
            state.carts = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(addCart.rejected, (state, action) => {
            state.loading = false
            state.carts = []
            state.success = false
            state.error =  action.error.message
        })
        //remove item from cart
        builder.addCase(removeItem.pending, (state) => {
            state.loading = true
        })
        builder.addCase(removeItem.fulfilled, (state, action) => {
            state.loading = false
            state.carts = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(removeItem.rejected, (state, action) => {
            state.loading = false
            state.carts = []
            state.success = false
            state.error =  action.error.message
        })
         //Update cart
         builder.addCase(updateCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.loading = false
            state.carts = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(updateCart.rejected, (state, action) => {
            state.loading = false
            state.carts = []
            state.success = false
            state.error =  action.error.message
        })
        //get cart By Id
        builder.addCase(getCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = false
            state.carts = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false
            state.carts = []
            state.success = false
            state.error =  action.error.message
        })
        //get carts
        builder.addCase(getAllCarts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCarts.fulfilled, (state, action) => {
            state.loading = false
            state.carts = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(getAllCarts.rejected, (state, action) => {
            state.loading = false
            state.carts = []
            state.success = false
            state.error =  action.error.message
        })
        //delete Cart
        builder.addCase(deleteCart.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCart.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })
        builder.addCase(deleteCart.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error =  action.error.message
        })
    }
})

export default cartSlice.reducer