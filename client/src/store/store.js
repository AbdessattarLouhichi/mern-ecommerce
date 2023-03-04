import { combineReducers, configureStore } from '@reduxjs/toolkit'
import globalReducer from './features'
import productReducer from './features/productSlice'
import categoryReducer from './features/categorySlice'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
import cartReducer from './features/cartSlice'
import orderReducer from './features/orderSlice'
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    global: globalReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }), 
})
export const persistor = persistStore(store)
//export default store

