import { createSlice } from '@reduxjs/toolkit'
import { getCountries } from '../api/countryApi'

const initialState = {
  loading: false,
  countries: [],
  error: '',
}
const countrySlice = createSlice({
  name: 'country',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.loading = false
      state.countries = action.payload
      state.error = ''
    })
    builder.addCase(getCountries.rejected, (state, action) => {
      state.loading = false
      state.countries = []
      state.error = action.error.message
    })
  },
})
export default countrySlice.reducer
