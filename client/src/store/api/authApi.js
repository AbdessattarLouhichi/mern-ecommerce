import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/config'



// Register Action 
export const register = createAsyncThunk('auth/register', async (values) => {
  try {
    const response = await axios.post('/register', values)
     return response.data.message
  } catch (error) {
    alert(error.message)
  }
})
 
// Activation action
export const accountActivation = createAsyncThunk('auth/accountActivation', async (code)=>{
  try {
    const response = await axios.get(`/accountActivation/${code}`)
    return response.data.message
  } catch (error) {
    console.log(error.message)
  }
})

// Login
export const login = createAsyncThunk('auth/login', async (values) => {
  try {
    const response = await axios.post('/login', values)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('id', response.data.id)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})
// Logout 
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.post('/logout')
     return response.data.message
  } catch (error) {
    alert(error.message)
  }
})

// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
  try {
    const response = await axios.post('/forgotPassword', email)
     return response.data.message
  } catch (error) {
    console.log(error.response.data.message)
  }
})

// Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (data) => {
  try {
    const response = await axios.post(`/resetPassword/${data.token}`, data.values)
     return response.data.message
  } catch (error) {
    alert(error.message)
  }
})