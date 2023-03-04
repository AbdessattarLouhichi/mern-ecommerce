import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/config'


// Add new product
export const addCart = createAsyncThunk('cart/addCart', async (data) => {
    try {
      const response =  await axios.post('/cart/addItem', data)
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  })

// Remove item
export const removeItem = createAsyncThunk('cart/removeItem', async (id) => {
  try {
    const response =  await axios.post('/cart/removeItem/' + id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

//decrease Item quantity
export const decreaseItem = createAsyncThunk('cart/decreaseItem', async (id) => {
  try {
    const response =  await axios.post('/cart/decreaseItem/' + id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

// Get Cart by Id
export const getCart = createAsyncThunk('cart/getCart', async (id) => {
  try {
    const response = await axios.get('/carts/' + id)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Get All Carts
export const getAllCarts = createAsyncThunk('product/getAllCarts', async () => {
  try {
    const response = await axios.get('/carts')
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Update cart
export const updateCart = createAsyncThunk('product/updateCart', async (values) => {
  try {
    const response = await axios.put('/carts/' + values.id, values.data)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Delete cart
export const deleteCart = createAsyncThunk('product/deleteCart', async (id) => {
  try {
    if (window.confirm('Do you want to remove?')){
      await axios.delete('/carts/' + id)
      window.location.reload()
    }
   
  } catch (error) {
    console.log(error.message)
  }
})
