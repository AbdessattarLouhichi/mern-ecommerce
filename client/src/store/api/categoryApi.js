import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/config'

// Get one category
export const getCategory = createAsyncThunk('category/getCategory', async (id) => {
  try {
    const response = await axios.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Get All categories
export const getAllCategories = createAsyncThunk('category/getAllCategories', async () => {
  try {
    const response = await axios.get('/categories')
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Add new category
export const createCategory = createAsyncThunk('category/createCategory', async (newCategory) => {
  try {
    const response =  await axios.post('/createCategory', newCategory)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Update category
export const updateCategory = createAsyncThunk('category/updateCategory', async (cat) => {
  try {
    const response = await axios.put('/categories/' + cat.id, cat.data)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Delete category
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
  try {
    if (window.confirm('Do you want to remove?')){
      await axios.delete('/categories/' + id)
      window.location.reload()
    }
   
  } catch (error) {
    console.log(error.message)
  }
})
