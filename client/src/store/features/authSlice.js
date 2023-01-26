import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'
import { register, accountActivation, login, logout, forgotPassword, resetPassword} from '../api/authApi'

const initialState =  {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers:(builder) => {
        // Register
        builder.addCase(register.pending, (state) => {
            state.loading = true
        })

        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
            state.error = ''
        })

        builder.addCase(register.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message
            state.success = false
        })

        // account Activation
        builder.addCase(accountActivation.pending, (state) => {
            state.loading = true
        })

        builder.addCase(accountActivation.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })

        builder.addCase(accountActivation.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message
            state.success = false
        })
        //Login
        builder.addCase(login.pending, (state) => {
            state.loading = true
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.userToken = action.meta.token
            state.success = true
            state.error = ''
        })

        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message
            state.success = false
        })
         // logout
         builder.addCase(logout.pending, (state) => {
            state.loading = true
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })

        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message
            state.success = false
        })
         // Forgot Password
         builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true
        })

        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
            state.error = ''
        })

        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message
            state.success = false
        })
        // Reset Password
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true
        })

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.userInfo = action.payload
            state.success = true
            state.error = ''
        })

        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.userInfo = {}
            state.userToken = null
            state.error = action.error.message
            state.success = false
        })
    }
})


export default authSlice.reducer
