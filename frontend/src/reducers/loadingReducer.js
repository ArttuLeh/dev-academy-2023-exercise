import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    toggleLoading(state, { payload }) {
      return payload
    },
  },
})

//export const selectLoading = (state) => state.loading

export const { toggleLoading } = loadingSlice.actions
export default loadingSlice.reducer
