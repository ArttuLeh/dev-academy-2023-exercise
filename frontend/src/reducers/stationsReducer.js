import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'

// reducer that set the state for all the stations data
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
    // call axios
    const data = await stationsService.getAll(currentPage)
    dispatch(setStations(data))
  }
}
export const { setStations } = stationsSlice.actions
export default stationsSlice.reducer
