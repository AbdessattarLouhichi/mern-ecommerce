import { createSlice } from '@reduxjs/toolkit'
import { checkout, getAllOrders, getOrder, deleteOrder } from '../api/orderApi'

const initialState = {
    loading: false,
    orders: [],
    success: false,
    error: '',
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        //Checkout
        builder.addCase(checkout.pending, (state) => {
            state.loading = true
        })
        builder.addCase(checkout.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(checkout.rejected, (state, action) => {
            state.loading = false
            state.orders = []
            state.success = false
            state.error =  action.error.message
        })
       
        //get order By Id
        builder.addCase(getOrder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(getOrder.rejected, (state, action) => {
            state.loading = false
            state.orders = []
            state.success = false
            state.error =  action.error.message
        })

        //get orders
        builder.addCase(getAllOrders.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false
            state.orders = []
            state.success = false
            state.error =  action.error.message
        })
        //delete Order
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error =  action.error.message
        })
    }
})

export default orderSlice.reducer