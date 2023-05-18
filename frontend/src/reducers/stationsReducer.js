import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'

const slice = createSlice({
  name: 'stations',
  initialState: [],
  reducers: {
    setStations(state, { payload }) {
      return payload
    },
  },
})

export const initializeStations = (currentPage) => {
  return async (dispatch) => {
    const data = await stationsService.getAll(currentPage)
    dispatch(setStations(data))
  }
}
export const { setStations } = slice.actions
export default slice.reducer
