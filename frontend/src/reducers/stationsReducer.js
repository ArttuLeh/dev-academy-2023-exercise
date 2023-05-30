import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'
import { toggleLoading } from './loadingReducer'

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

export const initializeStations = (currentPage, searchTerm) => {
  return async (dispatch) => {
    // call axios
    const data = await stationsService.getAll(currentPage, searchTerm)
    dispatch(toggleLoading(false))
    dispatch(setStations(data))
    dispatch(toggleLoading(true))
  }
}
export const { setStations } = stationsSlice.actions
export default stationsSlice.reducer
