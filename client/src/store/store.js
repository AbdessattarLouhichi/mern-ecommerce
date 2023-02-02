import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './features'
import productReducer from './features/productSlice'
import categoryReducer from './features/categorySlice'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'
import orderReducer from './features/orderSlice'


const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer
  },
})

export default store

