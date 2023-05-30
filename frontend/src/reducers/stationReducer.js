import { createSlice } from '@reduxjs/toolkit'
import stationsService from '../services/stations'
import { toggleLoading } from './loadingReducer'

// reducer that set the state for station data
const stationSlice = createSlice({
  name: 'station',
  initialState: [],
  reducers: {
    setStation(state, { payload }) {
      return payload
    },
  },
})

// dispatch the data to store
export const getStation = (id) => {
  return async (dispatch) => {
    // call axios
    const data = await stationsService.getStation(id)
    dispatch(toggleLoading(false))
    dispatch(setStation(data))
    dispatch(toggleLoading(true))
  }
}
export const { setStation } = stationSlice.actions
export default stationSlice.reducer
