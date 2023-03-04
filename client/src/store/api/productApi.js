import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/config'

// Get one product
export const getProduct = createAsyncThunk('product/getProduct', async (id) => {
  try {
    const response = await axios.get('/products/' + id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Get All Products
export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  try {
    const response = await axios.get('/products')
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Add new product
export const createProduct = createAsyncThunk('product/createProdcut', async (values) => {
  try {
    const response =  await axios.post('/createProduct', values)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Update Product
export const updateProduct = createAsyncThunk('product/updateProduct', async (data) => {
  try {
    let values = data.data;
    console.log(values)
    let formData = new FormData()
    Object.keys(values).forEach(fieldName =>{
      formData.append(fieldName, values[fieldName])
      })
    const response = await axios.put('/products/' + data.id, formData)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Delete Product
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  try {
    if (window.confirm('Do you want to remove?')){
      await axios.delete('/products/' + id)
      window.location.reload()
    }
   
  } catch (error) {
    console.log(error.message)
  }
})
