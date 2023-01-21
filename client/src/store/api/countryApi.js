import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCountries = createAsyncThunk('country/getCountries', async () => {
  try {
    const response = await axios.get('https://restcountries.com/v2/all')
    //console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
})
