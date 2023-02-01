import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/config'

// Get user by id
export const getUser = createAsyncThunk('user/getUser', async (id) => {
  try {
    const response = await axios.get('/users/' + id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

// Get All users
export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    try {
      const response = await axios.get('/users')
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  })
// Get All customers
export const getAllCustomers = createAsyncThunk('user/getAllCustomers', async () => {
    try {
      const response = await axios.get('/customers')
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  })
  // Update user
export const updateUser = createAsyncThunk('user/updateUser', async (values) => {
  try {
    const response = await axios.put('/users/' + values.id, values.data)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
//Delete User
export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  try {
    if (window.confirm('Do you want to remove?')){
      await axios.delete('/users/' + id)
      window.location.reload()
    }
  } catch (error) {
    console.log(error.message)
  }
})