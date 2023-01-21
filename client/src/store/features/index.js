import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
}

export const globalSlice = createSlice({
  name: 'changeState',
  initialState,
  reducers: {
    set: (state, action) => {
      state.sidebarShow = action.payload
    },
  },
})
export const { set } = globalSlice.actions

export default globalSlice.reducer
