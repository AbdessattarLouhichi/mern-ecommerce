import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './features'
import countryReducer from './features/countrySlice'
import productReducer from './features/productSlice'

const store = configureStore({
  reducer: {
    global: globalReducer,
    country: countryReducer,
    product: productReducer,
  },
})
export default store
