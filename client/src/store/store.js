import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './features'
import productReducer from './features/productSlice'
import categoryReducer from './features/categorySlice'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
  },
})
export default store
