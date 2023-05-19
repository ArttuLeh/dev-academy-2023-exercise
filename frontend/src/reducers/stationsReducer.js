import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'

const stationsSlice = createSlice({
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
export const { setStations } = stationsSlice.actions
export default stationsSlice.reducer
