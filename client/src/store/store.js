import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './features'
import countryReducer from './features/countrySlice'
import productReducer from './features/productSlice'
import categoryReducer from './features/categorySlice'

const store = configureStore({
  reducer: {
    global: globalReducer,
    country: countryReducer,
    category: categoryReducer,
    product: productReducer,
  },
})
export default store
