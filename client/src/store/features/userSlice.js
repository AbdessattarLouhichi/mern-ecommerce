import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers, getAllCustomers, getUser, updateUser, deleteUser  } from '../api/userApi'

const initialState = {
    loading: false,
    users: [],
    success: false,
    error: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        //builder.addCase getAllusers
        builder.addCase( getAllUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase( getAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.data
            state.error = ''
        })
        builder.addCase( getAllUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error =  action.error.message
        })
        //builder.addCase getUser
        builder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error =  action.error.message
        })
        //builder.addCase getAllCustomers
        builder.addCase(getAllCustomers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCustomers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.data
            state.error = ''
        })
        builder.addCase(getAllCustomers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error =  action.error.message
        })
        //builder.addCase updateUser
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.data
            state.success = true
            state.error = ''
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error =  action.error.message
        })
        //builder.addCase deleteUser
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error =  action.error.message
        })
    }
})

export default userSlice.reducer