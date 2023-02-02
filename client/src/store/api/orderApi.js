import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/config'


// Checkout
export const checkout = createAsyncThunk('order/checkout', async () => {
    try {
      const response =  await axios.post('/checkout')
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  })


// Get order
export const getOrder = createAsyncThunk('order/getOrder', async (id) => {
  try {
    const response = await axios.get('/orders' + id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Get All orders
export const getAllOrders = createAsyncThunk('order/getAllOrders', async () => {
  try {
    const response = await axios.get('/carts')
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Delete Product
export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id) => {
  try {
    if (window.confirm('Do you want to remove?')){
      await axios.delete('/orders/' + id)
      window.location.reload()
    }
   
  } catch (error) {
    console.log(error.message)
  }
})
