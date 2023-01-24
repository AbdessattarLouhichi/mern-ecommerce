import { createSlice } from '@reduxjs/toolkit'
import {getCategory, getAllCategories, createCategory, updateCategory, deleteCategory } from '../api/categoryApi'

const initialState = {
    loading: false,
    categories: [],
    success: false,
    error: '',
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        //builder.addCase getCategories
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error =  action.error.message
        })
        //builder.addCase getCategory
        builder.addCase(getCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(getCategory.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error =  action.error.message
        })
        //builder.addCase createCategory
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
            state.error = ''
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error =  action.error.message
        })
        //builder.addCase updateCategory
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload
            state.success = true
            state.error = ''
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error =  action.error.message
        })
        //builder.addCase deleteCategory
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = ''
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error =  action.error.message
        })
    }
})

export default categorySlice.reducer